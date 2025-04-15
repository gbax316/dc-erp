import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Log for debugging
console.log('main.jsx executing')

// Find root element
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

// Create root and render app
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  console.log('Root created')
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('Render called')
} else {
  console.error('Root element not found')
} 