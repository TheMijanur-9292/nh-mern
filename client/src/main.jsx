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

// নোটিফিকেশন সাবস্ক্রাইব ফাংশন
// client/src/main.jsx এর registerAndSubscribe ফাংশনটি আপডেট করুন

const registerAndSubscribe = async () => {
  try {
    const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BCxbFO2wC1Y38wRq7zFiOki0KYtWzRlwNhhWy30GkOsMGLcmy1P3g89QJ0cKP2Uskr85WuHkztHdNi5Ao-SrGVE' 
      });

      // লগইন করা ইউজারের আইডি সংগ্রহ করুন (আপনার প্রজেক্ট অনুযায়ী এটি বদলাতে পারে)
      const userData = JSON.parse(localStorage.getItem('user')); 
      const userId = userData?._id;

      if (userId) {
        // ব্যাকএন্ডে সাবস্ক্রিপশন ডাটা পাঠানো
        await fetch('http://localhost:5000/api/users/subscribe', {
          method: 'POST',
          body: JSON.stringify({ subscription, userId }),
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Subscription saved to database');
      }
    }
  } catch (error) {
    console.error('Subscription error:', error);
  }
};

// একটি RootWrapper তৈরি করা যাতে useEffect ব্যবহার করা যায়
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