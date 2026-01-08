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
  const valuePoints = [
    { icon: <Favorite className="au-values-icon" />, title: "Human-Centric Core", desc: "We foster real empathy, turning strangers into a reliable support system." },
    { icon: <Security className="au-values-icon" />, title: "Verified Trust", desc: "Advanced safety protocols ensuring every neighbor is real and verified." },
    { icon: <Groups className="au-values-icon" />, title: "Hyper-Local Network", desc: "Focusing on your immediate surroundings for lightning-fast assistance." },
    { icon: <EmojiObjects className="au-values-icon" />, title: "Disruptive Innovation", desc: "Using real-time mapping to bridge the gap between human needs and community." }
  ];

  return (
    <Box className="about-page-container">
      
      {/* Hero Section */}
      <Box className="au-hero-section">
        <Container maxWidth="lg">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
          >
            <Typography variant="h1" className="au-hero-main-title">
              Our Visionary <span className="au-hero-accent">Mission</span>
            </Typography>
            <Typography className="au-hero-subtitle">
              NeighborHelp isn't just an app; it's a social revolution. We're redefining the way 
              communities breathe, interact, and support each other in this digital age.
            </Typography>
            <Button className="au-hero-button">Explore Journey</Button>
          </motion.div>
        </Container>
      </Box>

      {/* Values Section */}
      <Box className="au-values-section">
        <Container maxWidth="md">
          <Typography variant="h3" className="au-values-title">
            Why Choose <span className="au-values-highlight">NeighborHelp?</span>
          </Typography>
          
          <Box className="au-values-cards-container">
            {valuePoints.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Box className="au-values-card">
                  <div className="au-values-icon-box">{point.icon}</div>
                  <div>
                    <Typography variant="h6" className="au-values-card-title">{point.title}</Typography>
                    <Typography variant="body1" className="au-values-card-desc">{point.desc}</Typography>
                  </div>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Founder Section */}
      <Box className="au-founder-section">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <div className="au-founder-avatar-container">
                <Avatar src="/founder.jpg" className="au-founder-avatar" />
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography className="au-founder-tag">Behind the Scenes</Typography>
              <Typography variant="h3" className="au-founder-title">The Spirit of Innovation</Typography>
              <Typography className="au-founder-quote">
                "In a world where we're connected to everything online, we've forgotten the people living three feet away. NeighborHelp was born to fix that gap."
              </Typography>
              <Box>
                <Typography variant="h6" className="au-founder-name">Md Mijanur Molla</Typography>
                <Typography variant="body2" className="au-founder-role">Community Admin & Founder</Typography>
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