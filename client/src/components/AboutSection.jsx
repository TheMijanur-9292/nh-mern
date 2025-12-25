import React from 'react';
import { Box, Container, Grid, Typography, Stack, Paper } from '@mui/material';
import { 
  VolunteerActivism, 
  Group, 
  HealthAndSafety, 
  Public 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <VolunteerActivism sx={{ fontSize: 40, color: '#764ba2' }} />,
    title: "Kindness First",
    desc: "We believe in the power of helping neighbors without expecting anything in return."
  },
  {
    icon: <Group sx={{ fontSize: 40, color: '#764ba2' }} />,
    title: "Community Growth",
    desc: "Building a stronger, more connected neighborhood through real-time interactions."
  },
  {
    icon: <HealthAndSafety sx={{ fontSize: 40, color: '#764ba2' }} />,
    title: "Safety & Trust",
    desc: "Our rating and badge system ensures you are interacting with verified, helpful people."
  },
  {
    icon: <Public sx={{ fontSize: 40, color: '#764ba2' }} />,
    title: "Localized Help",
    desc: "Find immediate help for groceries, medical needs, or emergencies right next door."
  }
];

const AboutSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* বাম পাশে টেক্সট কন্টেন্ট */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="overline" sx={{ color: '#764ba2', fontWeight: 'bold', letterSpacing: 2 }}>
                Who We Are
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, mt: 1, lineHeight: 1.2 }}>
                Connecting Hearts, <br /> 
                <span style={{ color: '#764ba2' }}>Building Neighborhoods.</span>
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                NeighborHelp is more than just an app; it's a movement to bring back the era 
                where neighbors knew and helped each other. Whether it's a medical emergency, 
                sharing groceries, or finding a lost pet, we bridge the gap between people 
                who need help and those ready to give it.
              </Typography>
            </motion.div>
          </Grid>

          {/* ডান পাশে ফিচার গ্রিড */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {features.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        height: '100%', 
                        borderRadius: '20px', 
                        bgcolor: '#f8f9fb',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                      }}
                    >
                      <Box sx={{ mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;