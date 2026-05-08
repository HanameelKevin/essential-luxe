import Link from "next/link";
import styles from "./Footer.module.css";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logo}>
            ESSENTIAL<span>LUXE</span>
          </Link>
          <p className={styles.tagline}>Bridging Continents, Delivering Distinction.</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/essential_luxe_imports" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://wa.me/254111421153" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div className={styles.linksSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/dashboard">My Dashboard</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h4>Contact Us</h4>
          <ul>
            <li>
              <Phone size={16} />
              <span>0111421153</span>
            </li>
            <li>
              <Mail size={16} />
              <span>essentialluxecare@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ESSENTIAL LUXE. All rights reserved.</p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/254111421153" 
        className={styles.floatingWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={32} />
      </a>
    </footer>
  );
}
