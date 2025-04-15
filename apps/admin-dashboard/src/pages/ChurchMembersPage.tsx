import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Church, getChurch, getChurchMembers } from '@/services/church';
import { Member } from '@/services/member';
import { formatDate } from '@/lib/utils';

export function ChurchMembersPage() {
  const { id } = useParams<{ id: string }>();
  const [church, setChurch] = useState<Church | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const [churchData, membersData] = await Promise.all([
          getChurch(id),
          getChurchMembers(id)
        ]);
        
        setChurch(churchData);
        setMembers(membersData);
        setError(null);
      } catch (error) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching church data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            to={`/churches/${id}`}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            ← Back to Church
          </Link>
          <h1 className="text-2xl font-bold">Members of {church.name}</h1>
        </div>
        <Link
          to={`/churches/${id}/members/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <p className="text-lg text-gray-500">No members found for this church</p>
          <Link
            to={`/churches/${id}/members/new`}
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Your First Member
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role / Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {member.profileImageUrl ? (
                        <img
                          src={member.profileImageUrl}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">
                            {member.firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          <Link to={`/members/${member.id}`} className="hover:underline">
                            {member.firstName} {member.lastName}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.gender ? member.gender.charAt(0).toUpperCase() + member.gender.slice(1) : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.phone || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {member.joinDate ? formatDate(member.joinDate) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.role || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{member.department || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/members/${member.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                      <Link
                        to={`/members/${member.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-900 ml-4"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 