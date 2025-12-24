import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, Stack } from '@mui/material'; // MUI components
import { Search, VolunteerActivism } from '@mui/icons-material'; // MUI Icons

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '85vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
        pb: 8, // Padding bottom
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <Typography 
            variant="h2" 
            component={motion.h2}
            sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Neighbor<span style={{ color: '#FFD700' }}>Help</span>
          </Typography>

          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
            Connecting Communities, One Hand at a Time. <br />
            Find help instantly or be a hero for your neighbor.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} // মোবাইলে কলাম, পিসিতে রো
            spacing={3} 
            justifyContent="center"
          >
            <Link to="/map" style={{ textDecoration: 'none' }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                size="large"
                startIcon={<Search />}
                sx={{
                  bgcolor: '#ff6b6b',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: '#ff5252' }
                }}
              >
                I Need Help
              </Button>
            </Link>

            <Link to="/map" style={{ textDecoration: 'none' }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variant="outlined"
                size="large"
                startIcon={<VolunteerActivism />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(5px)',
                  '&:hover': { borderColor: '#FFD700', color: '#FFD700', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Give Help
              </Button>
            </Link>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;