import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function MediaPage() {
  const [activeTab, setActiveTab] = useState('sermons');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media</h1>
        <div className="flex space-x-2">
          <Link 
            to="/media/sermons/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Sermon
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['sermons', 'devotionals', 'blogs', 'gallery'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'sermons' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Sermons module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
          
          {activeTab === 'devotionals' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Devotionals module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
          
          {activeTab === 'blogs' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Blogs module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
          
          {activeTab === 'gallery' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Gallery module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 