"use client";
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ sales: 0, revenue: 0, pending: 0 });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-light text-black">Marketplace Intelligence</h1>
            <p className="text-gray-400">Manage your luxury empire</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium">Export Data</button>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">+ Add Product</button>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Sales', value: '$124,500', color: 'bg-white' },
            { label: 'Active Requests', value: '42', color: 'bg-white' },
            { label: 'Monthly Revenue', value: '$12,800', color: 'bg-white' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border border-gray-100 shadow-sm ${stat.color}`}>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</span>
              <div className="text-3xl font-light text-black mt-2">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Management Table */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-black">Recent Orders & Requests</h3>
            <div className="flex gap-2">
              <button className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600">All</button>
              <button className="text-xs font-medium px-3 py-1 hover:bg-gray-100 rounded-full text-gray-400">Pending</button>
              <button className="text-xs font-medium px-3 py-1 hover:bg-gray-100 rounded-full text-gray-400">Shipped</button>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Item</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-black">Customer Name {i}</td>
                  <td className="px-6 py-4 text-gray-500">iPhone 15 Pro Max...</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-gold/20 text-gold uppercase">Pending</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-black">$1,200</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
