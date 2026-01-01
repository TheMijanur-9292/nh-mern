import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // গ্লোবাল সিএসএস ইমপোর্ট

// Material UI থিম কাস্টমাইজেশন (ঐচ্ছিক, কিন্তু ভালো)
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);