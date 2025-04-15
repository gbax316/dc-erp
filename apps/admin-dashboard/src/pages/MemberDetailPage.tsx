import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Member, getMember, deleteMember } from '@/services/member';
import { getChurch } from '@/services/church';
import { formatDate } from '@/lib/utils';

export function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [churchName, setChurchName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const memberData = await getMember(id);
        setMember(memberData);
        
        // Fetch church name
        if (memberData.churchId) {
          const churchData = await getChurch(memberData.churchId);
          setChurchName(churchData.name);
        }
        
        setError(null);
      } catch (error) {
        setError('Failed to fetch member details. Please try again.');
        console.error('Error fetching member:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteMember(id);
      
      if (member?.churchId) {
        navigate(`/churches/${member.churchId}/members`, { replace: true });
      } else {
        navigate('/members', { replace: true });
      }
    } catch (error) {
      setError('Failed to delete member. Please try again.');
      console.error('Error deleting member:', error);
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">{member.firstName} {member.lastName}</h1>
          <span
            className={`ml-4 px-2 py-1 text-xs font-semibold rounded-full ${
              member.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
          </span>
        </div>
        <div className="flex space-x-4">
          <Link
            to={`/members/${id}/edit`}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Edit Member
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Member'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                {member.profileImageUrl && (
                  <div className="mb-4">
                    <img
                      src={member.profileImageUrl}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Church</p>
                  <p>
                    <Link
                      to={`/churches/${member.churchId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {churchName}
                    </Link>
                  </p>
                </div>
                {member.gender && (
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p>{member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}</p>
                  </div>
                )}
                {member.dateOfBirth && (
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p>{formatDate(member.dateOfBirth)}</p>
                  </div>
                )}
                {member.joinDate && (
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p>{formatDate(member.joinDate)}</p>
                  </div>
                )}
                {member.baptismDate && (
                  <div>
                    <p className="text-sm text-gray-500">Baptism Date</p>
                    <p>{formatDate(member.baptismDate)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Church Involvement</h2>
              <div className="space-y-4">
                {member.role && (
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p>{member.role}</p>
                  </div>
                )}
                {member.department && (
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p>{member.department}</p>
                  </div>
                )}
                {member.ministryInvolvement && member.ministryInvolvement.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Ministry Involvement</p>
                    <ul className="list-disc list-inside">
                      {member.ministryInvolvement.map((ministry, index) => (
                        <li key={index}>{ministry}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{member.email}</p>
                </div>
                {member.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{member.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Address</h2>
              <div className="space-y-4">
                {member.address && (
                  <div>
                    <p className="text-sm text-gray-500">Street Address</p>
                    <p>{member.address}</p>
                  </div>
                )}
                {(member.city || member.state) && (
                  <div>
                    <p className="text-sm text-gray-500">City/State</p>
                    <p>
                      {[member.city, member.state].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}
                {member.country && (
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p>{member.country}</p>
                  </div>
                )}
              </div>
            </div>

            {member.familyMembers && member.familyMembers.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Family Members</h2>
                <ul className="divide-y divide-gray-200">
                  {member.familyMembers.map((family, index) => (
                    <li key={index} className="py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {family.memberId ? (
                              <Link
                                to={`/members/${family.memberId}`}
                                className="text-blue-600 hover:underline"
                              >
                                {family.name}
                              </Link>
                            ) : (
                              family.name
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{family.relationshipType}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Member</h3>
            <p className="mb-4">
              Are you sure you want to delete {member.firstName} {member.lastName}? This action cannot be undone.
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