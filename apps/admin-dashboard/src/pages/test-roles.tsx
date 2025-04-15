import React from 'react';
import { Link } from 'react-router-dom';

export default function TestRoles() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Test Role Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose a role to test the dashboard
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            to="/super-admin/dashboard"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Super Admin Dashboard
          </Link>
          
          <Link
            to="/admin/dashboard"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Admin Dashboard
          </Link>
          
          <Link
            to="/branch/dashboard"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Branch Admin Dashboard
          </Link>
          
          <Link
            to="/member/home"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Member Home
          </Link>
        </div>
      </div>
    </div>
  );
} 