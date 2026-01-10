import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 

// Material UI থিম কাস্টমাইজেশন
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#764ba2',
    },
    secondary: {
      main: '#667eea',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

// --- ১. ব্যাকএন্ড বেস ইউআরএল সেটআপ ---
// হোস্ট করার পর 'https://your-backend-url.onrender.com' আপনার রেন্ডার ইউআরএল হবে।
// .env ফাইল ব্যবহার করা প্রোডাকশনের জন্য সেরা প্র্যাকটিস।
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 

// নোটিফিকেশন সাবস্ক্রাইব ফাংশন
const registerAndSubscribe = async () => {
  try {
    const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BCxbFO2wC1Y38wRq7zFiOki0KYtWzRlwNhhWy30GkOsMGLcmy1P3g89QJ0cKP2Uskr85WuHkztHdNi5Ao-SrGVE' 
      });

      // লোকাল স্টোরেজ থেকে ইউজারের ডাটা এবং আইডি নেওয়া
      const userData = JSON.parse(localStorage.getItem('user')); 
      const userId = userData?._id || userData?.id;

      if (userId) {
        // --- ২. হার্ডকোড করা ইউআরএল পরিবর্তন করে ডাইনামিক করা হলো ---
        const response = await fetch(`${API_BASE_URL}/api/users/subscribe`, {
          method: 'POST',
          body: JSON.stringify({ subscription, userId }),
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        console.log('✅ Subscription Status:', data.message);
      }
    }
  } catch (error) {
    console.error('❌ Subscription error:', error);
  }
};

const RootWrapper = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerAndSubscribe();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootWrapper />
  </React.StrictMode>
);