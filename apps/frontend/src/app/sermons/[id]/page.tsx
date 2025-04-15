import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { getContentById, getSermons, Sermon } from '@/lib/api';

// Set revalidation time to 1 hour
export const revalidate = 3600;

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const sermon = await getContentById(params.id) as Sermon | null;
  
  if (!sermon) {
    return {
      title: 'Sermon Not Found',
      description: 'The requested sermon could not be found.'
    };
  }
  
  return {
    title: sermon.title,
    description: sermon.description,
    openGraph: {
      title: sermon.title,
      description: sermon.description,
      type: 'video',
      images: [{ url: sermon.thumbnailUrl }],
    },
  };
}

// Generate static params for the most recent sermons
export async function generateStaticParams() {
  const sermons = await getSermons({ limit: 10 });
  
  return sermons.map((sermon) => ({
    id: sermon.id,
  }));
}

export default async function SermonPage({ params }: { params: { id: string } }) {
  const sermon = await getContentById(params.id) as Sermon | null;
  
  // If the sermon doesn't exist, show a 404 page
  if (!sermon) {
    notFound();
  }
  
  // Fetch related sermons by the same speaker
  const relatedSermons = await getSermons({ 
    speaker: sermon.speaker,
    limit: 4
  });
  
  // Filter out the current sermon from related sermons
  const filteredRelatedSermons = relatedSermons.filter(s => s.id !== sermon.id).slice(0, 3);
  
  return (
    <div className="container-page">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/sermons" className="text-gray-500 hover:text-gray-700">Sermons</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {sermon.title}
            </li>
          </ol>
        </nav>
        
        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden mb-8">
          <div className="aspect-video w-full">
            <iframe
              src={sermon.videoUrl.replace('watch?v=', 'embed/')}
              title={sermon.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        {/* Sermon Details */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">{sermon.title}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {sermon.speaker}
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDate(sermon.date, { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            {sermon.scripture && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                {sermon.scripture}
              </div>
            )}
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg">{sermon.description}</p>
          </div>
          
          {sermon.tags && sermon.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {sermon.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Share and Download */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg className="h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
          
          <a 
            href={sermon.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Watch on YouTube
          </a>
        </div>
        
        {/* Related Sermons */}
        {filteredRelatedSermons.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">More from {sermon.speaker}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelatedSermons.map((relatedSermon) => (
                <Link 
                  key={relatedSermon.id} 
                  href={`/sermons/${relatedSermon.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={relatedSermon.thumbnailUrl || '/images/sermon-placeholder.jpg'}
                      alt={relatedSermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(relatedSermon.duration / 60)}:{relatedSermon.duration % 60 < 10 ? '0' : ''}{relatedSermon.duration % 60}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2">{relatedSermon.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(relatedSermon.date, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 