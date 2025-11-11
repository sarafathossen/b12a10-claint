import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} ></RouterProvider>
    </AuthProvider>
    <ToastContainer />

  </StrictMode>
)
