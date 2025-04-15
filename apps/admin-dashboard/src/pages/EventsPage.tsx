import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// This is a placeholder component for the Events page
// In a real implementation, we would fetch events from the API
export function EventsPage() {
  const [view, setView] = useState('calendar');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link 
          to="/events/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Event
        </Link>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 ${
            view === 'calendar' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setView('calendar')}
        >
          Calendar
        </button>
        <button
          className={`py-2 px-4 ${
            view === 'list' 
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setView('list')}
        >
          List
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-10">
          <p className="text-gray-500">Events module is under development.</p>
          <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Coming soon:</p>
            <ul className="text-sm text-gray-500 list-disc list-inside mt-2">
              <li>Calendar and list views of events</li>
              <li>Create and manage church events</li>
              <li>Track event attendance</li>
              <li>Send event invitations and reminders</li>
              <li>Manage event resources and registration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 