import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Groups, 
  Favorite, 
  Security, 
  EmojiObjects,
  LinkedIn,
  Twitter,
  Language
} from '@mui/icons-material';

const AboutUs = () => {
  const values = [
    { icon: <Favorite color="primary" />, title: "Kindness", desc: "আমরা বিশ্বাস করি ছোট একটি সাহায্য আমাদের কমিউনিটিকে আরও উন্নত করতে পারে।" },
    { icon: <Security color="primary" />, title: "Safety", desc: "ইউজারদের নিরাপত্তা এবং বিশ্বাস আমাদের কাছে সবচেয়ে গুরুত্বপূর্ণ।" },
    { icon: <Groups color="primary" />, title: "Community", desc: "প্রতিবেশীদের মধ্যে শক্তিশালী বন্ধন তৈরি করাই আমাদের মূল লক্ষ্য।" },
    { icon: <EmojiObjects color="primary" />, title: "Innovation", desc: "প্রযুক্তির মাধ্যমে মানবিক সমস্যা সমাধানের নতুন পথ খুঁজে বের করা।" }
  ];

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      
      {/* ১. Hero Section */}
      <Box sx={{ 
        bgcolor: '#764ba2', 
        color: '#fff', 
        py: { xs: 8, md: 12 }, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
      }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" fontWeight="900" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, lineHeight: 1.6 }}>
              NeighborHelp-এর লক্ষ্য হলো প্রতিবেশীদের মধ্যে পারস্পরিক সহযোগিতা এবং বিশ্বাসের একটি সেতুবন্ধন তৈরি করা। 
              আমরা চাই এমন একটি সমাজ যেখানে কেউ একা নয়, সবাই সবার পাশে থাকবে।
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ২. Core Values Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="800" align="center" sx={{ mb: 6 }}>
          What We Stand For
        </Typography>
        <Grid container spacing={4}>
          {values.map((val, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fb', borderRadius: '24px', height: '100%' }}>
                  <Box sx={{ mb: 2 }}>{val.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{val.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{val.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ৩. Founder Section (এখানে আপনার ইমেজ সেকশন রাখা হয়েছে) */}
      <Box sx={{ bgcolor: '#f3f0ff', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                <Box 
                  sx={{ 
                    position: 'relative', 
                    width: '100%', 
                    maxWidth: 400, 
                    mx: 'auto'
                  }}
                >
                  {/* Founder Image Placeholder */}
                  <Avatar
                    src="/path-to-your-image.jpg" // এখানে আপনার ছবির পাথ দিন
                    sx={{ 
                      width: '100%', 
                      height: 'auto', 
                      aspectRatio: '1/1',
                      borderRadius: '30px',
                      boxShadow: '0 20px 40px rgba(118, 75, 162, 0.2)',
                      bgcolor: '#764ba2' 
                    }}
                  />
                  <Box sx={{ 
                    position: 'absolute', bottom: -20, right: -20, 
                    bgcolor: '#fff', p: 2, borderRadius: '15px', 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    display: { xs: 'none', md: 'block' }
                  }}>
                    <Stack direction="row" spacing={1}>
                      <LinkedIn sx={{ color: '#0077b5' }} />
                      <Twitter sx={{ color: '#1DA1F2' }} />
                      <Language sx={{ color: '#764ba2' }} />
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <Typography variant="overline" color="primary" fontWeight="bold" letterSpacing={2}>
                  THE VISIONARY
                </Typography>
                <Typography variant="h3" fontWeight="900" sx={{ mb: 2, mt: 1 }}>
                  Meet Our Founder
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  "NeighborHelp শুরু হয়েছিল একটি সহজ চিন্তা থেকে—প্রযুক্তির এই যুগে আমরা কেন আমাদের পাশের মানুষটিকে চিনি না? 
                  আমি চেয়েছিলাম এমন একটি প্লাটফর্ম তৈরি করতে যা বিপদের সময় মানুষকে একে অপরের কাছাকাছি নিয়ে আসবে।"
                </Typography>
                <Box>
                  <Typography variant="h6" fontWeight="bold">Your Name Here</Typography>
                  <Typography variant="body2" color="primary">Founder & Lead Developer</Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ৪. Footer Call to Action */}
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Be Part of the Revolution
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          প্রতিবেশী হিসেবে একে অপরের হাত ধরার এই যাত্রায় আপনিও যোগ দিন।
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="caption" color="text.secondary">
          © 2025 NeighborHelp Community. All rights reserved.
        </Typography>
      </Container>

    </Box>
  );
};

export default AboutUs;