import React from 'react';
import { DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

interface VowsSummaryProps {
  totalVowed: number;
  totalFulfilled: number;
  currency?: string;
}

const VowsSummary: React.FC<VowsSummaryProps> = ({ 
  totalVowed = 0, 
  totalFulfilled = 0, 
  currency = '$' 
}) => {
  // Calculate percentage fulfilled
  const percentageFulfilled = totalVowed > 0 
    ? Math.round((totalFulfilled / totalVowed) * 100) 
    : 0;
  
  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount).replace('$', currency);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Vows Summary</h2>
          <div className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
            {percentageFulfilled}% Fulfilled
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${percentageFulfilled}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-1">
              <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">Total Vowed</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(totalVowed)}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-1">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-gray-500">Fulfilled</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(totalFulfilled)}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <a 
            href="/vows" 
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Vows
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VowsSummary; 