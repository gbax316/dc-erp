import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-provider';

export function UnauthorizedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="p-4 mb-6">
          <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100 text-red-500 text-2xl">
            🔒
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. This area requires a higher access level than your current role: <span className="font-semibold">{user?.role || 'Guest'}</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Go Back
          </button>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 