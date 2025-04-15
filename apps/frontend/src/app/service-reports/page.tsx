import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Reports | Dominion City',
  description: 'Submit service reports for Dominion City church services',
};

export default function ServiceReportsPage() {
  return (
    <div className="container-page">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Reports</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This feature is only available in the admin dashboard. Please login to access service report submission.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
        <div className="mb-6">
          <svg
            className="h-20 w-20 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Admin Access Required</h2>
        <p className="text-gray-600 mb-8">
          Service report submission is only available to administrators. Please login to the admin dashboard to submit service reports.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Login
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 