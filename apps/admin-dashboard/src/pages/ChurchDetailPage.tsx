import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Church, getChurch, deleteChurch } from '@/services/church';
import { formatDate } from '@/lib/utils';

export function ChurchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [church, setChurch] = useState<Church | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteChurch(id);
      navigate('/churches', { replace: true });
    } catch (error) {
      setError('Failed to delete church. Please try again.');
      console.error('Error deleting church:', error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/churches')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">{church.name}</h1>
          <span
            className={`ml-4 px-2 py-1 text-xs font-semibold rounded-full ${
              church.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {church.status.charAt(0).toUpperCase() + church.status.slice(1)}
          </span>
        </div>
        <div className="flex space-x-4">
          <Link
            to={`/churches/${id}/members`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            View Members
          </Link>
          <Link
            to={`/churches/${id}/edit`}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Edit Church
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Church'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Church Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {church.logoUrl && (
                  <div className="col-span-2 mb-2">
                    <img
                      src={church.logoUrl}
                      alt={church.name}
                      className="h-24 w-24 rounded-md object-contain bg-gray-100 p-2"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p>{church.foundedDate ? formatDate(church.foundedDate) : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pastor</p>
                  <p>{church.pastor || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{church.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{church.phone}</p>
                </div>
                {church.website && (
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={church.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {church.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Address</h2>
              <div className="space-y-2">
                <p>{church.address}</p>
                <p>
                  {church.city}, {church.state}
                </p>
                <p>{church.country}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="text-2xl font-bold">{church.memberCount || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Church</h3>
            <p className="mb-4">
              Are you sure you want to delete {church.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}