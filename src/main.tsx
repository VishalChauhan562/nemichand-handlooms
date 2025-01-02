import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Get the root element
const rootElement = document.getElementById('root')

// Verify we have a root element
if (!rootElement) {
  throw new Error('Root element not found')
}

// Create and render the React root
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)