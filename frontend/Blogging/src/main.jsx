import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientid=import.meta.env.VITE_CLIENT_ID;


createRoot(document.getElementById('root')).render(

   <BrowserRouter>
    <Toaster position='top-right'/>
    <GoogleOAuthProvider clientId={clientid}>
    <App />
    </GoogleOAuthProvider>
    
 </BrowserRouter> 
)
