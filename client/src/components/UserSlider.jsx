import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Stack, Rating, Chip, IconButton, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBackIos, ArrowForwardIos, WorkspacePremium } from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UserSlider = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // ডাটাবেস থেকে সব ইউজার নিয়ে আসা
  useEffect(() => {
    const fetchUsers = async () => {
      try {
       // const res = await axios.get('http://localhost:5000/api/users/all'); // এই রাউটটি ব্যাকএন্ডে যোগ করতে হবে
       const res = await axios.get(`${API_BASE_URL}/api/users/all`); 
       
       setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  // অটো-প্লে লজিক (প্রতি ৫ সেকেন্ডে স্লাইড চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, users.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === users.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? users.length - 1 : prev - 1));
  };

  if (users.length === 0) return null;

  return (
    <Box sx={{ 
      width: '100%', 
      background: 'linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%)', 
      py: 4, 
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid #eee'
    }}>
      <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: '800', color: '#764ba2', textTransform: 'uppercase', letterSpacing: 1 }}>
        Our Active Neighbors
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        {/* Left Arrow */}
        <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: { xs: 5, md: 50 }, zIndex: 10 }}>
          <ArrowBackIos />
        </IconButton>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              alignItems="center" 
              sx={{ 
                p: 3, 
                bgcolor: 'white', 
                borderRadius: '20px', 
                boxShadow: '0 10px 30px rgba(118, 75, 162, 0.1)',
                mx: 'auto'
              }}
            >
              <Avatar 
                sx={{ width: 100, height: 100, fontSize: 40, bgcolor: '#764ba2', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
              >
                {users[currentIndex].name?.charAt(0)}
              </Avatar>

              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Chip 
                  icon={<WorkspacePremium sx={{ fontSize: '14px !important' }} />} 
                  label={users[currentIndex].badge || "Active Neighbor"} 
                  size="small" 
                  sx={{ mb: 1, bgcolor: '#f3f0ff', color: '#764ba2', fontWeight: 'bold' }} 
                />
                <Typography variant="h5" fontWeight="900">{users[currentIndex].name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{users[currentIndex].email}</Typography>
                
                <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                  <Rating value={users[currentIndex].ratings?.average || 0} readOnly size="small" precision={0.5} />
                  <Typography variant="caption" fontWeight="bold">({users[currentIndex].ratings?.average || 0})</Typography>
                </Stack>
              </Box>
            </Stack>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        <IconButton onClick={handleNext} sx={{ position: 'absolute', right: { xs: 5, md: 50 }, zIndex: 10 }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Navigation Dots */}
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
        {users.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: currentIndex === index ? 24 : 8,
              height: 8,
              borderRadius: 4,
              bgcolor: currentIndex === index ? '#764ba2' : '#ccc',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default UserSlider;