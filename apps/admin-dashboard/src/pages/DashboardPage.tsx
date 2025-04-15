import React from 'react';
import { useAuth } from '@/context/auth-provider';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.firstName || 'User'}!</h2>
        <p className="text-gray-600">
          This is your dashboard. Use the sidebar to navigate through different sections of the application.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-700">Churches</h3>
            <p className="text-sm text-blue-600 mt-1">Manage your churches and their details</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-700">Members</h3>
            <p className="text-sm text-green-600 mt-1">View and manage church members</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-700">Events</h3>
            <p className="text-sm text-purple-600 mt-1">Schedule and organize church events</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="font-medium text-yellow-700">Finance</h3>
            <p className="text-sm text-yellow-600 mt-1">Track donations and manage finances</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="font-medium text-red-700">Reports</h3>
            <p className="text-sm text-red-600 mt-1">Generate and view reports</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h3 className="font-medium text-indigo-700">Settings</h3>
            <p className="text-sm text-indigo-600 mt-1">Configure system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
} 