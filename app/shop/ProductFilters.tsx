"use client";
import { useState } from 'react';

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([40, 4700]);

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h3 className="text-lg font-bold text-[#0F2C3D]">PRODUCT CATEGORIES</h3>
        <span className="text-gray-400">☷</span>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex justify-between cursor-pointer">
            <span className="font-semibold text-gray-700">Engineering Books</span>
            <span>⌄</span>
          </div>
          <div className="mt-2 pl-2 space-y-1 text-sm text-gray-600">
            <p className="hover:text-[#FF6B00] cursor-pointer">Civil Engineering</p>
            <p className="hover:text-[#FF6B00] cursor-pointer text-[#FF6B00] font-semibold">Mining Engineering</p>
          </div>
        </div>

        <div className="border-b pb-4">
          <div className="flex justify-between cursor-pointer">
            <span className="font-semibold text-gray-700">FILTER BY PRICE</span>
            <span>⌃</span>
          </div>
          <div className="mt-4">
            <div className="relative h-1 bg-gray-200 rounded mt-2">
              <div className="absolute left-0 right-1/2 top-0 h-1 bg-[#FF6B00] rounded"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF6B00] rounded-full border-2 border-white shadow"></div>
              <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF6B00] rounded-full border-2 border-white shadow"></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
          <button className="mt-3 w-full bg-[#FF6B00] text-white py-2 rounded text-sm font-medium hover:bg-[#e55e00] transition">
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
}