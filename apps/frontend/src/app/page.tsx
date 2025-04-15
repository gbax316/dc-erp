export default function Home() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/church-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Welcome to Dominion City
        </h1>
        <p style={{ fontSize: '20px', maxWidth: '600px', margin: '0 auto 30px' }}>
          A place of faith, hope, and love where everyone is welcome.
        </p>
        <div>
          <a href="/about" style={{
            display: 'inline-block',
            background: '#0284c7',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>
            Learn More
          </a>
          <a href="/sermons" style={{
            display: 'inline-block',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Watch Sermons →
          </a>
        </div>
      </div>

      <div style={{
        background: '#0284c7',
        color: 'white',
        padding: '50px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Join Us for Worship</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Sunday Service</h3>
            <p style={{ fontSize: '18px' }}>10:00 AM - 12:00 PM</p>
          </div>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Bible Study</h3>
            <p style={{ fontSize: '18px' }}>Wednesdays at 7:00 PM</p>
          </div>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Youth Group</h3>
            <p style={{ fontSize: '18px' }}>Fridays at 6:00 PM</p>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <a href="/login" 
          style={{
            display: 'inline-block',
            background: '#374151',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Sign In / Register
        </a>
      </div>
    </div>
  )
} 