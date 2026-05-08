"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing required fields" };
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

  } catch (error: any) {
    return { error: error.message || "Something went wrong" };
  }

  redirect("/login?registered=true");
}
