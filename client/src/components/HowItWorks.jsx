import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Paper, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { PostAdd, Map, Handshake, ArrowForward } from '@mui/icons-material';

const steps = [
  {
    id: 1,
    icon: <PostAdd sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />,
    title: "Post Request",
    desc: "Describe what you need.",
    color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    shadow: "0 8px 16px rgba(255, 107, 107, 0.3)"
  },
  {
    id: 2,
    icon: <Map sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />,
    title: "Locate",
    desc: "Find helpers nearby.",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    shadow: "0 8px 16px rgba(79, 172, 254, 0.3)"
  },
  {
    id: 3,
    icon: <Handshake sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />,
    title: "Connect",
    desc: "Chat & solve problems.",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    shadow: "0 8px 16px rgba(118, 75, 162, 0.3)"
  }
];

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa', position: 'relative', overflow: 'hidden' }}>
      
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 4, md: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: '800', color: '#2d3436', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            How It Works?
          </Typography>
          <Typography variant="body2" sx={{ color: '#636e72', mt: 1 }}>
            Simple 3-step process to get help.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, md: 4 }} 
          justifyContent="center" 
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          {/* Desktop Connecting Line (Hidden on Mobile) */}
          {!isMobile && (
            <Box 
              sx={{
                position: 'absolute',
                top: '40%',
                left: '10%',
                right: '10%',
                height: '2px',
                background: 'linear-gradient(to right, #ccc 50%, transparent 50%)',
                backgroundSize: '20px 1px', // Dashed line effect
                zIndex: 0
              }} 
            />
          )}

          {steps.map((step, index) => (
            <Grid item xs={12} sm={4} md={4} key={index} sx={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 4 }, // মোবাইলে প্যাডিং কম
                    borderRadius: '20px',
                    textAlign: 'center',
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    maxWidth: { xs: '100%', sm: '300px' }, // কার্ডের সাইজ ফিক্স করা
                    mx: 'auto' // সেন্টারে আনার জন্য
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 60, md: 80 }, // মোবাইলে আইকন ছোট
                      height: { xs: 60, md: 80 },
                      mb: 2,
                      background: step.color,
                      boxShadow: step.shadow
                    }}
                  >
                    {step.icon}
                  </Avatar>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    {step.id}. {step.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#636e72', fontSize: { xs: '0.85rem', md: '1rem' } }}>
                    {step.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;