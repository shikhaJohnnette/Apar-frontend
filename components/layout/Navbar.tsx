"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Trigger API call or redirect here
  };

  return (
    <header className="w-full bg-[#0F2C3D] text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar - Already clean from previous response */}
      <div className="bg-[#0a1f2a] px-6 py-2 text-xs flex justify-between items-center">
        <span>📚 APAR PUBLICATION – Knowledge Without Limits</span>
        <span className="hidden md:block">📞 +91 93046 58246</span>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="text-[#FF6B00]">APAR</span>
          <span>Publication</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 w-full md:max-w-xl flex bg-white rounded-full overflow-hidden">
          <select className="bg-gray-100 text-gray-700 px-4 py-2 outline-none text-sm border-r border-gray-200">
            <option>All Categories</option>
            <option>Courses</option>
            <option>Books</option>
          </select>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title, Author..." 
            className="flex-1 px-4 py-2 outline-none text-gray-700"
          />
          <button type="submit" className="bg-[#FF6B00] hover:bg-[#e55e00] px-6 py-2 text-white font-semibold transition-colors">
            SEARCH
          </button>
        </form>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="flex items-center gap-1 hover:text-[#FF6B00]">
            <span aria-hidden="true">●</span> Sign In
          </Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-[#FF6B00]">
            <span aria-hidden="true">🛒</span> Cart
            <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}