import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Categories from '../components/Categories';
import UserSlider from '../components/UserSlider';
import Footer from '../components/Footer';


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box sx={{ overflowX: 'hidden', bgcolor: '#ffffff' }}>
      <HeroSection />
      <Stats />
      <HowItWorks />
      <Categories />
     
      <UserSlider />
      <Footer />
    </Box>
  );
};

export default Home;