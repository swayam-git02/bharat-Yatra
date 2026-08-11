import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import { WishlistProvider } from './context/WishlistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <TripProvider>
              <App />
            </TripProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
