'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
}

interface DashboardCardProps {
  title: string;
  description: string;
  color: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // For demo purposes, use localStorage data instead of API
    const userName = localStorage.getItem('userName') || 'Member';
    setUser({ name: userName });
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#0284c7' }}>
        Dashboard
      </h1>
      
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome, {user?.name || 'Member'}!
        </h2>
        <p style={{ color: '#4b5563', marginBottom: '20px' }}>
          This is your dashboard. Here you can access all the features and services available to you.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          <DashboardCard 
            title="My Profile" 
            description="View and update your personal information"
            color="#3b82f6"
          />
          <DashboardCard 
            title="Church Events" 
            description="Browse upcoming events and activities"
            color="#10b981"
          />
          <DashboardCard 
            title="Giving & Donations" 
            description="Manage your tithes and offerings"
            color="#f59e0b"
          />
          <DashboardCard 
            title="Prayer Requests" 
            description="Submit and view prayer requests"
            color="#8b5cf6"
          />
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        marginTop: '20px'
      }}>
        <button 
          onClick={() => {
            localStorage.removeItem('authToken');
            router.push('/login');
          }}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, color }: DashboardCardProps) {
  return (
    <div style={{ 
      background: `${color}10`, 
      padding: '20px', 
      borderRadius: '8px',
      border: `1px solid ${color}30`
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: color, marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#4b5563' }}>
        {description}
      </p>
    </div>
  );
} 