"use client";

import { useActionState } from "react";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { register } from "@/lib/actions";
import { UserPlus, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className={styles.authWrapper}>
      <Navbar />
      <main className={styles.authMain}>
        <div className={styles.authSplit}>
          {/* Visual Side */}
          <div className={styles.authVisual}>
            <img 
              src="https://images.unsplash.com/photo-1549463354-1237a6b4122d?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury Import Gateway"
            />
            <div className={styles.authVisualContent}>
              <AnimatedSection direction="none" delay={0.2}>
                <h2>Orchestrated Perfection</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <p>Join an exclusive network of businesses and professionals sourcing the exceptional from across the globe.</p>
              </AnimatedSection>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.authContent}>
            <div className={styles.authCard}>
              <AnimatedSection className={styles.authHeader}>
                <h1>Create Account</h1>
                <p>Initialize your premium gateway to global logistics.</p>
              </AnimatedSection>

              <form action={formAction} className={styles.authForm}>
                {state?.error && <div className={styles.errorMessage}>{state.error}</div>}
                
                <AnimatedSection delay={0.1} className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="E.g. Alexander Vance"
                    required
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.2} className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="alexander@luxe.com"
                    required
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.3} className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <button type="submit" className={styles.submitBtn} disabled={isPending}>
                    {isPending ? <Loader2 className={styles.spinner} /> : <>Initialize Account <ArrowRight size={18} /></>}
                  </button>
                </AnimatedSection>
              </form>

              <AnimatedSection delay={0.5} className={styles.authFooter}>
                Already a member? <Link href="/login">Login to your gateway</Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
