import { Link } from 'react-router-dom';
import { ChurchForm } from '@/components/church/ChurchForm';

export function AddChurchPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link
          to="/churches"
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          ← Back to Churches
        </Link>
        <h1 className="text-2xl font-bold">Add New Church</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-md p-6">
        <ChurchForm />
      </div>
    </div>
  );
} 