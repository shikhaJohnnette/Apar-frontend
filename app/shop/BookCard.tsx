"use client";
import Link from 'next/link';
import { IBook } from '@/types';

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="text-gray-300 text-4xl font-bold">📖</div> 
        <div className="absolute inset-0 bg-[#0F2C3D]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="bg-[#FF6B00] p-2 rounded-full text-white hover:scale-110 transition-transform">🛒</button>
          <Link href={`/books/${book.id}`} className="bg-white p-2 rounded-full text-[#0F2C3D] hover:scale-110 transition-transform">
            <span className="text-xs font-bold px-1">VIEW</span>
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-[#FF6B00] text-xs mb-1">
           <span aria-label={`${book.rating} stars`}>★★★★★</span>
          <span className="text-gray-400 ml-1">({book.rating})</span>
        </div>
        
        <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
        
        <div className="mt-4 flex items-center justify-between border-t pt-3 mt-auto">
          <span className="text-xl font-bold text-[#0F2C3D]">₹{book.price}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Paperback</span>
        </div>
      </div>
    </div>
  );
}