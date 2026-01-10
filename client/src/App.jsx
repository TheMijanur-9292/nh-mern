import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material'; 

// ১. ScrollToTop ইমপোর্ট করা আছে
import ScrollToTop from './components/ScrollToTop';

// Existing Imports
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

// New Pages Imports
import AboutUs from './pages/AboutUs';
import SafetyGuide from './pages/SafetyGuide';
import SuccessStories from './pages/SuccessStories';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

// CSS Import
import './App.css';

function App() {
  return (
    <BrowserRouter>
      
      <CssBaseline /> 
      
      {/* ২. ScrollToTop কম্পোনেন্টটি এখানে বসানো হলো */}
      <ScrollToTop />

      {/* Container with className */}
      <div className="app-container">
        
        <Navbar />

        {/* Main section with className */}
        <main className="main-content">
          <Routes>
          
            {/* Core Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:userId" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />

            {/* Support Routes */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/safety-guide" element={<SafetyGuide />} />
            <Route path="/safety" element={<Navigate to="/safety-guide" replace />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;