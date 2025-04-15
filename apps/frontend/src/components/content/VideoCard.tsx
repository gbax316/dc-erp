import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Sermon } from '@/lib/api';

interface VideoCardProps {
  sermon: Sermon;
}

export default function VideoCard({ sermon }: VideoCardProps) {
  // Format the duration into minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/sermons/${sermon.id}`}>
        <div className="relative aspect-video">
          <Image
            src={sermon.thumbnailUrl || '/images/sermon-placeholder.jpg'}
            alt={sermon.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(sermon.duration)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold line-clamp-2">{sermon.title}</h3>
          <p className="text-gray-600 mt-1 text-sm">
            {sermon.speaker} • {formatDate(sermon.date, { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
          <p className="text-sm mt-2 text-gray-700 line-clamp-2">{sermon.description}</p>
          
          {sermon.scripture && (
            <div className="mt-3 text-sm">
              <span className="text-blue-600 font-medium">{sermon.scripture}</span>
            </div>
          )}
          
          {sermon.tags && sermon.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {sermon.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {sermon.tags.length > 3 && (
                <span className="text-xs text-gray-500 px-1">+{sermon.tags.length - 3} more</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
} 