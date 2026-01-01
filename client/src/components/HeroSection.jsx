import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { Search, VolunteerActivism } from '@mui/icons-material';

// CSS ইমপোর্ট
import './HeroSection.css';

const HeroSection = () => {
  return (
    <Box className="hero-wrapper">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          {/* ব্যাজ এর মতো একটি ছোট টেক্সট */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
             <Typography variant="overline" sx={{ letterSpacing: 4, fontWeight: 'bold', color: '#FFD700' }}>
               Community Support Platform
             </Typography>
          </motion.div>

          <Typography variant="h2" className="hero-title">
            Neighbor<span>Help</span>
          </Typography>

          <Typography variant="h5" className="hero-subtitle">
            Connecting Communities, One Hand at a Time. <br />
            Find help instantly or be a hero for your neighbor.
          </Typography>

          <Stack 
            className="hero-stack"
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
          >
            <Link to="/map" style={{ textDecoration: 'none' }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                size="large"
                startIcon={<Search />}
                className="btn-need-help"
              >
                I Need Help
              </Button>
            </Link>

            <Link to="/map" style={{ textDecoration: 'none' }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                size="large"
                startIcon={<VolunteerActivism />}
                className="btn-give-help"
              >
                Give Help
              </Button>
            </Link>
          </Stack>
        </motion.div>
      </Container>

      {/* নিচের দিকে একটি ছোট ডেকোরেশন লাইন */}
      <Box sx={{ 
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        opacity: 0.5, animation: 'bounce 2s infinite' 
      }}>
        <Typography variant="caption" sx={{ color: 'white', display: 'block' }}>Scroll to Explore</Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;