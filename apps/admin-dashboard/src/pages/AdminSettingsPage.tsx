import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth-provider';
import { getUsers, setUserStatus, changeUserRole, deleteUser } from '@/services/user';
import { User, RoleDefinitions, UserRole } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { UserForm } from '@/components/admin/UserForm';

export function AdminSettingsPage() {
  const { user: currentUser, hasRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isSuperAdmin = hasRole(UserRole.SUPER_ADMIN);
  const isAdmin = hasRole(UserRole.ADMIN);

  useEffect(() => {
    fetchUsers();
  }, [isAdmin]);

  const fetchUsers = async () => {
    if (!isAdmin) return;
    
    try {
      setIsLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    try {
      await setUserStatus(userId, isActive);
      // Update the user in the local state
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, isActive } 
          : u
      ));
    } catch (error) {
      setError('Failed to update user status. Please try again.');
      console.error('Error updating user status:', error);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      if (userId === currentUser?.id) {
        setError("You cannot change your own role.");
        return;
      }
      
      await changeUserRole(userId, newRole);
      // Update the user in the local state
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, role: newRole } 
          : u
      ));
    } catch (error) {
      setError('Failed to update user role. Please try again.');
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?.id) {
      setError("You cannot delete your own account.");
      setShowDeleteConfirm(null);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      setShowDeleteConfirm(null);
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUserFormSuccess = () => {
    setShowAddUserModal(false);
    fetchUsers();
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          You don't have permission to access the Admin Settings.
        </div>
        <div className="flex justify-center">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">User Management</h2>
          <p className="text-sm text-gray-500">
            Manage users, roles, and permissions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">
                            {user.firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={user.id === currentUser?.id || (!isSuperAdmin && user.role === 'super_admin')}
                      >
                        {RoleDefinitions.map(role => (
                          <option 
                            key={role.id} 
                            value={role.id}
                            disabled={!isSuperAdmin && role.id === 'super_admin'}
                          >
                            {role.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {RoleDefinitions.find(r => r.id === user.role)?.name || user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={(e) => handleStatusChange(user.id, e.target.checked)}
                        className="sr-only peer"
                        disabled={user.id === currentUser?.id}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingUserId(editingUserId === user.id ? null : user.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        disabled={!isSuperAdmin && user.role === 'super_admin'}
                      >
                        {editingUserId === user.id ? 'Done' : 'Edit'}
                      </button>
                      <Link
                        to={`/admin/users/${user.id}/reset-password`}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Reset Password
                      </Link>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={user.id === currentUser?.id || (!isSuperAdmin && user.role === 'super_admin')}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <UserForm 
              onSuccess={handleUserFormSuccess}
              onCancel={() => setShowAddUserModal(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p className="mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
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