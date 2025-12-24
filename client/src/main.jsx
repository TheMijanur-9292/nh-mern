import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // এটা রাখতে পারো বা ডিলিট করতে পারো
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// একটি ডিফল্ট থিম তৈরি করা হলো (ইচ্ছা করলে কালার কাস্টমাইজ করতে পারবে)
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea', // তোমার হিরো সেকশন এর কালার
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ব্রাউজারের ডিফল্ট স্টাইল রিসেট করে */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)