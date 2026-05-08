"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import styles from "./page.module.css";
import { ArrowRight, Plane, Ship, Package, ShieldCheck, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <AnimatedSection direction="none" delay={0.2}>
                <span className={styles.badge}>Gateway to Distinction</span>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4}>
                <h1>Bridging Continents, Delivering Status</h1>
              </AnimatedSection>
              
              <AnimatedSection delay={0.6}>
                <p>Premium logistics and sourcing orchestrated for those who demand the exceptional from China and the USA.</p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.8}>
                <div className={styles.heroCtas}>
                  <Link href="/register" className={styles.primaryBtn}>
                    Start Your Order <ArrowRight size={18} />
                  </Link>
                  <Link href="/#services" className={styles.secondaryBtn}>
                    Explore Services
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="left" delay={0.5} className={styles.heroImageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Import"
                className={styles.heroImage}
              />
              <div className={styles.heroImageAccent}></div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className="container">
            <div className={styles.featuresGrid}>
              <AnimatedSection delay={0.1} className={styles.featureCard}>
                <Globe size={24} strokeWidth={1.5} />
                <h3>Global Concierge</h3>
                <p>Direct access to verified premium suppliers across two continents, handled with absolute precision.</p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2} className={styles.featureCard}>
                <ShieldCheck size={24} strokeWidth={1.5} />
                <h3>Seamless Security</h3>
                <p>Your investments are protected through every nautical mile and airway with our white-glove logistics.</p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3} className={styles.featureCard}>
                <Package size={24} strokeWidth={1.5} />
                <h3>Bespoke Sourcing</h3>
                <p>From single luxury items to complex commercial stock, we tailor our gateway to your specific needs.</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Shipping Timelines Section */}
        <section id="services" className={styles.services}>
          <div className="container">
            <AnimatedSection className={styles.sectionHeader}>
              <span className={styles.accentText}>Logistics Orchestration</span>
              <h2>Optimized Shipping for the Modern Professional</h2>
            </AnimatedSection>
            
            <div className={styles.servicesGrid}>
              <AnimatedSection direction="up" delay={0.1} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>
                  <Plane size={24} strokeWidth={1.5} />
                </div>
                <h3>Air Priority</h3>
                <span className={styles.timeline}>Approx. 15 Business Days</span>
                <p>The swift choice for electronics, high-fashion, and time-sensitive acquisitions.</p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.3} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>
                  <Ship size={24} strokeWidth={1.5} />
                </div>
                <h3>Ocean Freight</h3>
                <span className={styles.timeline}>35–45 Business Days</span>
                <p>The distinguished method for bulk imports, bespoke furniture, and industrial machinery.</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* The Orchestration Section */}
        <section className={styles.process}>
          <div className="container">
            <div className={styles.processGrid}>
              <div className={styles.processSticky}>
                <AnimatedSection>
                  <span className={styles.accentText}>The Orchestration</span>
                  <h2>A Seamless Journey from Inquiry to Handover</h2>
                  <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Our process is designed for absolute transparency and security. 
                    We don't just ship; we orchestrate a global logistics masterpiece.
                  </p>
                </AnimatedSection>
              </div>
              
              <div className={styles.processList}>
                {[
                  {
                    title: "Strategic Inquiry",
                    desc: "Share your sourcing requirements or product links. Our concierge team validates availability and premium supplier credentials."
                  },
                  {
                    title: "Bespoke Procurement",
                    desc: "We handle the negotiation and secure purchase of your assets, ensuring all financial transactions are protected."
                  },
                  {
                    title: "Secure Consolidation",
                    desc: "Your items are received at our China or USA hubs, inspected for quality, and professionally prepared for transit."
                  },
                  {
                    title: "Global Transit",
                    desc: "Items are dispatched via your chosen method—Air or Sea—with full tracking and customs clearance handled by our experts."
                  },
                  {
                    title: "Final Handover",
                    desc: "White-glove delivery to your doorstep, ensuring your luxury acquisitions arrive in pristine condition."
                  }
                ].map((step, i) => (
                  <AnimatedSection key={i} delay={i * 0.15} className={styles.processStep}>
                    <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Collection (Gallery) */}
        <section className={styles.gallery}>
          <div className="container">
            <AnimatedSection className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 8rem' }}>
              <span className={styles.accentText}>The Collection</span>
              <h2>A Portfolio of Global Distinction</h2>
            </AnimatedSection>

            <div className={styles.galleryGrid}>
              {[
                { 
                  img: "https://images.unsplash.com/photo-1600585154340-be6199f7a009?q=80&w=2070", 
                  title: "Architectural Elements", 
                  cat: "Bespoke Furniture",
                  class: styles.item1 
                },
                { 
                  img: "https://images.unsplash.com/photo-1513519247388-193ad51c50be?q=80&w=2070", 
                  title: "Precision Timepieces", 
                  cat: "Luxury Assets",
                  class: styles.item2 
                },
                { 
                  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070", 
                  title: "Advanced Electronics", 
                  cat: "Commercial Tech",
                  class: styles.item3 
                },
                { 
                  img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070", 
                  title: "Refined Textiles", 
                  cat: "Luxury Fashion",
                  class: styles.item4 
                }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.2} className={`${styles.galleryItem} ${item.class}`}>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.galleryCaption}>
                    <span>{item.cat}</span>
                    <h4>{item.title}</h4>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.categories}>
          <div className="container">
            <AnimatedSection className={styles.sectionHeader}>
              <span className={styles.accentText} style={{ color: 'var(--accent)' }}>Curated Portfolios</span>
              <h2 style={{ color: 'white' }}>Exceptional Goods, Seamlessly Delivered</h2>
            </AnimatedSection>
            
            <div className={styles.categoryGrid}>
              {[
                'High-End Electronics', 
                'Bespoke Furniture', 
                'Luxury Essentials', 
                'Designer Accessories', 
                'Premium Textiles', 
                'Specialized Equipment'
              ].map((cat, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className={styles.catItem}>
                  <span>{cat}</span>
                  <ChevronRight size={24} opacity={0.3} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.finalCta}>
          <div className="container">
            <AnimatedSection className={styles.ctaBox}>
              <h2>Ready to redefine your sourcing?</h2>
              <p>Experience the luxury of a seamless global gateway. Join the elite network of Essential Luxe partners.</p>
              <Link href="/register" className={styles.primaryBtn} style={{ margin: '0 auto' }}>
                Initialize Your Gateway <ArrowRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
