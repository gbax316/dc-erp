import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSermons } from '@/lib/api';
import VideoCard from '@/components/content/VideoCard';

export const metadata: Metadata = {
  title: 'Sermons',
  description: 'Watch and listen to our latest sermons and messages.',
};

// Set revalidation time to 1 hour
export const revalidate = 3600;

export default async function SermonsPage() {
  // Fetch sermons
  const sermons = await getSermons({ limit: 20 });
  
  return (
    <div className="container-page">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Sermons & Messages</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch and listen to weekly sermons, teachings, and messages from our pastors and guest speakers.
        </p>
      </div>
      
      {/* Filters - Future enhancement */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-medium">Filter By:</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
              Latest
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Series
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Topics
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Speakers
            </button>
          </div>
          <div className="ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sermons..."
                className="w-full md:w-64 px-4 py-2 pl-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Sermon */}
      {sermons.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Message</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-2/3 relative">
                <div className="aspect-video w-full">
                  <iframe
                    src={sermons[0].videoUrl.replace('watch?v=', 'embed/')}
                    title={sermons[0].title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="p-6 md:w-1/3">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  Latest Message
                </div>
                <Link 
                  href={`/sermons/${sermons[0].id}`}
                  className="block mt-2 text-2xl font-semibold text-gray-900 hover:text-blue-600"
                >
                  {sermons[0].title}
                </Link>
                <p className="mt-2 text-gray-600">
                  {sermons[0].speaker}
                </p>
                <p className="mt-4 text-gray-700">{sermons[0].description}</p>
                <div className="mt-6">
                  <Link
                    href={`/sermons/${sermons[0].id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sermon Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Messages</h2>
        
        {sermons.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700">No sermons found</h3>
            <p className="mt-2 text-gray-500">Check back later for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skip the first sermon as it's featured above */}
            {sermons.slice(1).map((sermon) => (
              <VideoCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {sermons.length > 9 && (
          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium">
              Load More Sermons
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 