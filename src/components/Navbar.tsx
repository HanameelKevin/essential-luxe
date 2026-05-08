"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";
import { Menu, X, User as UserIcon, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          ESSENTIAL<span>LUXE</span>
        </Link>

        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <Link href="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link href="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
          {session ? (
            <>
              <Link href="/dashboard" className={styles.dashboardBtn} onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <div className={styles.userProfile}>
                <UserIcon size={18} />
                <span>{session.user?.name?.split(" ")[0]}</span>
                <button onClick={() => signOut()} className={styles.logoutBtn}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn} onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/register" className={styles.registerBtn} onClick={() => setIsMenuOpen(false)}>Join Now</Link>
            </>
          )}
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
