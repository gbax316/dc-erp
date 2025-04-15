import React from 'react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex-1">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="text-lg">🔔</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="text-lg">✉️</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="text-lg">❓</span>
        </button>
      </div>
    </header>
  );
} 