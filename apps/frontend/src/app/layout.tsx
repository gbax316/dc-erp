export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Dominion City</title>
        <meta name="description" content="A welcoming church community dedicated to worship, discipleship, and service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <header style={{ 
          background: 'white', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/" style={{ textDecoration: 'none', color: '#0284c7' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ marginRight: '10px' }}
              >
                <path 
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" 
                  stroke="#0284c7" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Dominion City</span>
            </div>
          </a>
          <nav>
            <a href="/" style={{ marginRight: '20px', color: '#0284c7', textDecoration: 'none' }}>Home</a>
            <a href="/about" style={{ marginRight: '20px', color: '#0284c7', textDecoration: 'none' }}>About</a>
            <a href="/sermons" style={{ marginRight: '20px', color: '#0284c7', textDecoration: 'none' }}>Sermons</a>
            <a href="/events" style={{ marginRight: '20px', color: '#0284c7', textDecoration: 'none' }}>Events</a>
            <a href="/contact" style={{ marginRight: '20px', color: '#0284c7', textDecoration: 'none' }}>Contact</a>
            <a 
              href="/login"
              style={{
                display: 'inline-block',
                background: '#0284c7',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Sign In / Register
            </a>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ 
          background: '#1f2937', 
          color: 'white', 
          padding: '40px 24px',
          textAlign: 'center',
          marginTop: '60px'
        }}>
          <p style={{ margin: '0' }}>
            &copy; 2025 Dominion City. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
} 