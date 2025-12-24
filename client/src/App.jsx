import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material'; 
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn'; // ইম্পোর্ট করো
import SignUp from './pages/SignUp'; // ইম্পোর্ট করো
import Messages from './pages/Messages';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline /> 
      
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%', // এটি নিশ্চিত করে যে অ্যাপটি পুরো উইডথ নিচ্ছে
          overflowX: 'hidden' // হরাইজন্টাল স্ক্রল বন্ধ করবে
        }}
      >
        <Navbar />

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            width: '100%', // মেইন কন্টেন্টও ফুল উইডথ হবে
            display: 'flex',
            flexDirection: 'column',
            p: 0, // কোনো প্যাডিং থাকবে না
            m: 0  // কোনো মার্জিন থাকবে না
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/signin" element={<SignIn />} />  {/* নতুন রাউট */}
          <Route path="/signup" element={<SignUp />} />  {/* নতুন রাউট */}
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Messages />} />
          </Routes>
        </Box>
        
      </Box>
    </BrowserRouter>
  );
}

export default App;