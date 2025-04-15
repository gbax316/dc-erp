'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#b91c1c' }}>
        Something went wrong!
      </h1>
      <pre style={{ 
        padding: '16px', 
        background: '#f3f4f6', 
        borderRadius: '8px', 
        overflow: 'auto',
        margin: '20px 0',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        style={{
          background: '#0284c7',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        Try again
      </button>
    </div>
  );
} 