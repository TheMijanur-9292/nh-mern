import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Box sx={{ overflowX: 'hidden', bgcolor: '#f0f2f5' }}>
      <HeroSection />
      <Stats />
      <HowItWorks />
      <Categories />
      <Footer />
    </Box>
  );
};

export default Home;