import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Stack, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Groups, Favorite, Security, EmojiObjects,
  LinkedIn, Twitter, Language, RocketLaunch, AutoAwesome, CheckCircle
} from '@mui/icons-material';
import Footer from '../components/Footer'; 
import './AboutUs.css';

const AboutUs = () => {
  const points = [
    { icon: <Favorite className="point-icon red" />, title: "Human-Centric Core", desc: "We foster real empathy, turning strangers into a reliable support system." },
    { icon: <Security className="point-icon blue" />, title: "Verified Trust", desc: "Advanced safety protocols ensuring every neighbor is real and verified." },
    { icon: <Groups className="point-icon purple" />, title: "Hyper-Local Network", desc: "Focusing on your immediate surroundings for lightning-fast assistance." },
    { icon: <EmojiObjects className="point-icon yellow" />, title: "Disruptive Innovation", desc: "Using real-time mapping to bridge the gap between human needs and community." }
  ];

  return (
    <Box className="about-page-container">
      
      {/* --- HERO SECTION --- */}
      <Box className="modern-hero">
        <div className="animated-blob"></div>
        <Container maxWidth="lg">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" className="hero-main-title">
              Our Visionary <span className="neon-text">Mission</span>
            </Typography>
            <Typography className="hero-sub-text">
              NeighborHelp isn't just an app; it's a social revolution. We're redefining the way 
              communities breathe, interact, and support each other in this digital age.
            </Typography>
            <Button className="vibrant-btn">Explore Journey</Button>
          </motion.div>
        </Container>
      </Box>

      {/* --- WHY CHOOSE SECTION (Compact Linear Design) --- */}
      <Box className="values-wrapper">
        <Container maxWidth="md">
          <Typography variant="h3" className="section-title">
            Why Choose <span className="highlight">NeighborHelp?</span>
          </Typography>
          
          <Box className="points-container">
            {points.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="point-row"
              >
                <div className="point-icon-box">{point.icon}</div>
                <div className="point-text-box">
                  <Typography variant="h6" className="point-title">{point.title}</Typography>
                  <Typography variant="body1" className="point-desc">{point.desc}</Typography>
                </div>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* --- FOUNDER SECTION --- */}
      <Box className="creative-founder-section">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <div className="avatar-canvas">
                <Avatar src="/founder.jpg" className="floating-avatar" />
                <div className="orbit-ring"></div>
                <div className="social-dock">
                  <LinkedIn className="dock-icon" />
                  <Twitter className="dock-icon" />
                  <Language className="dock-icon" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography className="overline-tag">Behind the Scenes</Typography>
              <Typography variant="h3" className="founder-head">The Spirit of <AutoAwesome className="sparkle-icon" /> Innovation</Typography>
              <Typography className="founder-quote-text">
                "In a world where we're connected to everything online, we've forgotten the people living three feet away. NeighborHelp was born to fix that gap."
              </Typography>
              <Box className="founder-meta">
                <Typography variant="h6" className="f-name">Md Mijanur Molla</Typography>
                <Typography variant="body2" className="f-title">Community Admin</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      

      <Footer />
    </Box>
  );
};

export default AboutUs;