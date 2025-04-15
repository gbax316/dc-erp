import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChurches } from '@/services/church';

export function ChurchesPage() {
  const [churches, setChurches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChurches = async () => {
      try {
        setIsLoading(true);
        const data = await getChurches();
        setChurches(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching churches:', err);
        setError('Failed to load churches. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChurches();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Churches</h1>
        <Link 
          to="/churches/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Church
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading churches...</p>
        </div>
      ) : churches.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">No churches found</p>
          <Link 
            to="/churches/new" 
            className="text-blue-600 hover:text-blue-800"
          >
            Add your first church
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {churches.map((church: any) => (
            <Link 
              to={`/churches/${church.id}`} 
              key={church.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                {church.logoUrl ? (
                  <img 
                    src={church.logoUrl} 
                    alt={church.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-4xl font-bold text-gray-400">
                    {church.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{church.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{church.city}, {church.state}</p>
                <div className="flex justify-between items-center">
                  <span 
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      church.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {church.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-500">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 