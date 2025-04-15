import React from 'react';
import type { Metadata } from 'next';
import { getDevotionals, Devotional as ApiDevotional } from '@/lib/api';
import DevotionalCard from '@/components/content/DevotionalCard';

// Set metadata for the page
export const metadata: Metadata = {
  title: 'Daily Devotionals | Grace Church',
  description: 'Access our daily devotionals for spiritual growth and encouragement.',
};

// Set revalidation time to 1 hour
export const revalidate = 3600;

// Format a devotional from the API to match the DevotionalCard component's expected format
function formatDevotional(devotional: ApiDevotional) {
  return {
    id: devotional.id,
    title: devotional.title,
    description: devotional.description,
    thumbnailUrl: devotional.thumbnailUrl,
    pdfUrl: devotional.pdfUrl,
    date: devotional.date,
    author: devotional.author,
    // Add optional properties if needed
    category: devotional.tags?.[0], // Use first tag as category if available
    readTime: '5' // Default read time in minutes
  };
}

export default async function DevotionalsPage() {
  // Fetch devotionals with a limit of 20
  const devotionals = await getDevotionals({ limit: 20 });

  // Map API devotionals to the format expected by DevotionalCard
  const formattedDevotionals = devotionals.map(formatDevotional);

  // Get the featured devotional (latest one)
  const featuredDevotional = formattedDevotionals[0];

  return (
    <div className="container-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-xl p-8 mb-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Daily Devotionals</h1>
          <p className="text-lg text-blue-100 mb-6">
            Find spiritual nourishment through our collection of devotionals, designed to encourage and inspire your daily walk with God.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium">
              Subscribe to Daily Devotionals
            </button>
            <button className="bg-blue-800 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium border border-blue-700">
              Browse by Topic
            </button>
          </div>
        </div>
      </section>

      {/* Filter Options */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Devotionals</h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="filterBy" className="text-sm font-medium text-gray-700">
              Filter by:
            </label>
            <select
              id="filterBy"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="all"
            >
              <option value="all">All Topics</option>
              <option value="faith">Faith</option>
              <option value="prayer">Prayer</option>
              <option value="family">Family</option>
              <option value="relationships">Relationships</option>
            </select>
            
            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sortBy"
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="newest"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured Devotional */}
      {formattedDevotionals.length > 0 && (
        <section className="mb-12">
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img
                  src={formattedDevotionals[0].thumbnailUrl || '/images/devotional-placeholder.jpg'}
                  alt={formattedDevotionals[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold mb-1">
                  Featured Devotional
                </div>
                <h3 className="text-2xl font-bold mb-2">{formattedDevotionals[0].title}</h3>
                <p className="text-gray-600 mb-4">
                  By {formattedDevotionals[0].author} • {new Date(formattedDevotionals[0].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-700 mb-6">{formattedDevotionals[0].description}</p>
                <a
                  href={formattedDevotionals[0].pdfUrl}
                  download
                  className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
                >
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Devotional Grid */}
      <section className="mb-12">
        {formattedDevotionals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No devotionals found</h3>
            <p className="text-gray-500 mt-2">Check back soon for new devotionals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skip the first devotional as it's featured above */}
            {formattedDevotionals.slice(1).map((devotional) => (
              <DevotionalCard key={devotional.id} devotional={devotional} />
            ))}
          </div>
        )}
      </section>

      {/* Load More */}
      {formattedDevotionals.length > 9 && (
        <div className="flex justify-center my-8">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg shadow-sm">
            Load More Devotionals
          </button>
        </div>
      )}

      {/* Subscription CTA */}
      <section className="bg-gray-50 rounded-xl p-8 my-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Daily Spiritual Nourishment</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive our devotionals directly in your inbox every morning.
            Start your day with inspiration and spiritual guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:rounded-r-none sm:border-r-0 mb-2 sm:mb-0"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 