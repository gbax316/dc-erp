import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface Vow {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'upcoming';
  date: string | null;
}

const VowsSummary = () => {
  // In a real app, this would come from an API call
  const vows: Vow[] = [
    {
      id: '1',
      name: 'Membership Vow',
      status: 'completed',
      date: '2023-05-12'
    },
    {
      id: '2',
      name: 'Baptism',
      status: 'completed',
      date: '2023-06-18'
    },
    {
      id: '3',
      name: 'Tithe Commitment',
      status: 'pending',
      date: null
    },
    {
      id: '4',
      name: 'Ministry Service',
      status: 'upcoming',
      date: null
    }
  ];

  const getStatusIcon = (status: Vow['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'upcoming':
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusText = (status: Vow['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
    }
  };

  const completedVows = vows.filter(vow => vow.status === 'completed').length;
  const totalVows = vows.length;
  const completionPercentage = Math.round((completedVows / totalVows) * 100);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Vows & Commitments</h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {vows.map(vow => (
          <div key={vow.id} className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(vow.status)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{vow.name}</p>
              <div className="flex items-center mt-1">
                <span className={`text-xs px-2 py-1 rounded-full 
                  ${vow.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    vow.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`
                }>
                  {getStatusText(vow.status)}
                </span>
                {vow.date && (
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(vow.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <a
          href="/member/vows"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all commitments
          <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default VowsSummary; 