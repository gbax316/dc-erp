'use client';

import React from 'react';

export interface Devotional {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  pdfUrl?: string;
  date: string;
  author: string;
  category?: string;
  readTime?: string;
}

export interface DevotionalCardProps {
  devotional: Devotional;
}

const DevotionalCard: React.FC<DevotionalCardProps> = ({ devotional }) => {
  const {
    title,
    description,
    thumbnailUrl,
    pdfUrl,
    date,
    author,
    category,
    readTime,
  } = devotional;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {thumbnailUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        {category && (
          <span className="text-xs font-semibold text-primary-600 uppercase">
            {category}
          </span>
        )}
        <h3 className="text-xl font-bold mt-2 mb-2">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
          {readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{readTime} min read</span>
            </>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          {pdfUrl && (
            <a 
              href={pdfUrl}
              download
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              Download PDF
            </a>
          )}
          <a 
            href={`/devotionals/${devotional.id}`}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevotionalCard; 