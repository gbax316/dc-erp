import { useParams, Link } from 'react-router-dom';
import { MemberForm } from '@/components/member/MemberForm';

export function AddMemberPage() {
  const { churchId } = useParams<{ churchId: string }>();
  
  const breadcrumb = churchId ? (
    <Link
      to={`/churches/${churchId}/members`}
      className="mr-4 text-gray-500 hover:text-gray-700"
    >
      ← Back to Church Members
    </Link>
  ) : (
    <Link
      to="/members"
      className="mr-4 text-gray-500 hover:text-gray-700"
    >
      ← Back to Members
    </Link>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        {breadcrumb}
        <h1 className="text-2xl font-bold">Add New Member</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-md p-6">
        <MemberForm churchId={churchId} />
      </div>
    </div>
  );
} 