import React, { useState } from 'react';

export function FinancePage() {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Finance</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['transactions', 'donations', 'budgets', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'transactions' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Transactions module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Donations module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}

          {activeTab === 'budgets' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Budgets module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Reports module is under development.</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 