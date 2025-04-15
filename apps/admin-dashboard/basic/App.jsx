import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h1>Basic React App</h1>
      <p>You've clicked the button {count} times</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Click me
      </button>
    </div>
  )
}

export default App 