import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Church, getChurch } from '@/services/church';
import { ChurchForm } from '@/components/church/ChurchForm';

export function EditChurchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [church, setChurch] = useState<Church | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChurch = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getChurch(id);
        setChurch(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch church details. Please try again.');
        console.error('Error fetching church:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChurch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !church) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error || 'Church not found'}
        </div>
        <div className="flex justify-center">
          <Link
            to="/churches"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Churches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/churches/${id}`}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          ← Back to Church Details
        </Link>
        <h1 className="text-2xl font-bold">Edit Church: {church.name}</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-md p-6">
        <ChurchForm 
          initialData={church} 
          onSuccess={() => navigate(`/churches/${id}`)} 
        />
      </div>
    </div>
  );
} 