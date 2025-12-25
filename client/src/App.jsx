import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material'; 

// বিদ্যমান ইম্পোর্টসমূহ
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

// নতুন তৈরি করা পেজসমূহের ইম্পোর্ট
import AboutUs from './pages/AboutUs';
import SafetyGuide from './pages/SafetyGuide';
import SuccessStories from './pages/SuccessStories';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline /> 
      
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        <Navbar />

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 0, 
            m: 0
          }}
        >
          <Routes>
            {/* মূল পেজসমূহ */}
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:userId" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />

            {/* নতুন যুক্ত করা পেজসমূহের রাউট */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/safety" element={<SafetyGuide />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Box>
        
      </Box>
    </BrowserRouter>
  );
}

export default App;