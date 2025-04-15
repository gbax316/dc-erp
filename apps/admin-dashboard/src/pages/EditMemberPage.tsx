import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Member, getMember } from '@/services/member';
import { MemberForm } from '@/components/member/MemberForm';

export function EditMemberPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getMember(id);
        setMember(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch member details. Please try again.');
        console.error('Error fetching member:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error || 'Member not found'}
        </div>
        <div className="flex justify-center">
          <Link
            to="/members"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/members/${id}`}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          ← Back to Member Details
        </Link>
        <h1 className="text-2xl font-bold">Edit Member: {member.firstName} {member.lastName}</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-md p-6">
        <MemberForm 
          initialData={member} 
          onSuccess={() => navigate(`/members/${id}`)} 
        />
      </div>
    </div>
  );
} 