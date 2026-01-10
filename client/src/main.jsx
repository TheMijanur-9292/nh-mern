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
const registerAndSubscribe = async () => {
  try {
    const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BCxbFO2wC1Y38wRq7zFiOki0KYtWzRlwNhhWy30GkOsMGLcmy1P3g89QJ0cKP2Uskr85WuHkztHdNi5Ao-SrGVE' 
      });

      // লগইন করা ইউজারের আইডি সংগ্রহ করুন
      const userData = JSON.parse(localStorage.getItem('user')); 
      const userId = userData?._id || userData?.id;
      // 👇👇👇 ডিবাগিং কোড এখানে শুরু 👇👇👇
      console.log("🔍 DEBUG: LocalStorage Data:", userData);
      console.log("🔍 DEBUG: Extracted User ID:", userId);
      // 👆👆👆 ডিবাগিং কোড শেষ 👆👆👆

      if (userId) {
        console.log("🚀 DEBUG: Sending subscription to backend..."); // এই লাইনটি আসছে কিনা দেখুন

        // ব্যাকএন্ডে সাবস্ক্রিপশন ডাটা পাঠানো
        const response = await fetch('http://localhost:5000/api/users/subscribe', {
          method: 'POST',
          body: JSON.stringify({ subscription, userId }),
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        console.log('✅ Backend Response:', data);
      } else {
        console.log("⚠️ DEBUG: No User ID found. Skipping subscription save.");
      }
    }
  } catch (error) {
    console.error('❌ Subscription error:', error);
  }
};

// একটি RootWrapper তৈরি করা যাতে useEffect ব্যবহার করা যায়
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