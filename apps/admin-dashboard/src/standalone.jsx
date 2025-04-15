import React from 'react'
import ReactDOM from 'react-dom/client'

// Simple standalone app for testing
function StandaloneApp() {
  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto' 
    }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#0284c7' }}>Dominion City ERP Admin</h1>
        <p style={{ color: '#4b5563' }}>Welcome to the administrative dashboard</p>
      </header>

      <main>
        <div style={{ 
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#111827' }}>Admin Portal</h2>
          <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
            This is a standalone version of the admin dashboard. The application is loading correctly.
          </p>
          
          <p>To access the full admin dashboard, we need to fix the import issues with:</p>
          <ul style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
            <li>The path aliases in Vite configuration</li>
            <li>The import statements in the auth-provider.tsx file</li>
          </ul>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '1rem',
            background: '#f3f4f6',
            borderRadius: '4px',
            marginBottom: '1.5rem'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem', color: '#3b82f6' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Backend connection status: <strong>Demo Mode</strong></span>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={() => alert('This would navigate to the login page in the full application.')}
              style={{
                background: '#0284c7',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

// Find root element
const rootElement = document.getElementById('root')

// Render app
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <StandaloneApp />
    </React.StrictMode>
  )
} else {
  console.error('Root element not found')
} 