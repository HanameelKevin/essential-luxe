"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <Navbar />
      <main className={styles.authMain}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>Welcome Back</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? <Loader2 className={styles.spinner} /> : <>Login <LogIn size={18} /></>}
            </button>
          </form>

          <p className={styles.authFooter}>
            Don't have an account? <Link href="/register">Sign Up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
