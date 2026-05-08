import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find({ userId: (session.user as any).id }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productName, description, imageUrl, sourceLocation, shippingMethod, quantity, notes } = body;

    await dbConnect();

    const newOrder = await Order.create({
      userId: (session.user as any).id,
      productName,
      description,
      imageUrl,
      sourceLocation,
      shippingMethod,
      quantity,
      notes,
    });

    // Send Email Notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        secure: process.env.EMAIL_SERVER_PORT === "465",
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"ESSENTIAL LUXE System" <${process.env.EMAIL_SERVER_USER}>`,
        to: "essentialluxecare@gmail.com",
        subject: `New Order Request - ESSENTIAL LUXE`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #000; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Order Request</h2>
            <p><strong>Customer:</strong> ${session.user?.name} (${session.user?.email})</p>
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Source:</strong> ${sourceLocation}</p>
            <p><strong>Shipping:</strong> ${shippingMethod}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
            ${imageUrl ? `<p><strong>Image:</strong> <a href="${imageUrl}">View Image</a></p><img src="${imageUrl}" style="max-width: 100%; height: auto; border-radius: 8px;" />` : ""}
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // We don't fail the order if email fails, but we log it
    }

    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
