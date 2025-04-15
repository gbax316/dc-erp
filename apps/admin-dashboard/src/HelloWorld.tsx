export default function HelloWorld() {
  return (
    <div style={{ 
      margin: '50px auto', 
      maxWidth: '600px', 
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center' as const
    }}>
      <h1 style={{ color: '#333' }}>Hello, World!</h1>
      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        If you can see this message, React is working correctly.
      </p>
    </div>
  )
} 