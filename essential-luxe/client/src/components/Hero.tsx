import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 z-0" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4 block">
            Defining Excellence in Every Detail
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-6">
            Bridging Continents,<br />
            <span className="italic font-serif text-gold">Delivering Distinction</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg mb-10 font-light">
            Experience the pinnacle of sourcing. From the tech hubs of China to the luxury houses of the USA, we bring the world's finest essentials to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-black text-white px-8 py-4 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300">
              Explore Collection
            </Link>
            <Link href="/import" className="border border-black text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300">
              Request Custom Import
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating elements for "Emotional Design" */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 top-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 bottom-1/4 w-80 h-80 bg-gray-200/40 rounded-full blur-3xl"
      />
    </section>
  );
};
