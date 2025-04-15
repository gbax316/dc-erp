import React from 'react';

export function TestPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', color: '#0284c7', marginBottom: '1rem' }}>Test Page</h1>
      <p style={{ fontSize: '1.2rem' }}>
        If you can see this page, React rendering is working correctly.
      </p>
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: '#f0f9ff',
        border: '1px solid #0284c7',
        borderRadius: '8px',
      }}>
        <p>This is a test page to verify that the application can render components.</p>
      </div>
    </div>
  );
} 