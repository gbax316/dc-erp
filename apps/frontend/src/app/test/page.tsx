export default function TestPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Dominion City Test Page
      </h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
        If you can see this page, basic routing in Next.js is working correctly.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          background: '#0284c7',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Back to Home
      </a>
    </div>
  );
} 