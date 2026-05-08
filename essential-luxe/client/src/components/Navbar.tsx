import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-tighter text-black">
        ESSENTIAL <span className="text-gold">LUXE</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
        <Link href="/import" className="hover:text-black transition-colors">Import Preorder</Link>
        <Link href="/track" className="hover:text-black transition-colors">Track Order</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium hover:text-gold transition-colors">Login</Link>
        <Link href="/register" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
          Join Luxe
        </Link>
      </div>
    </nav>
  );
};
