import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Map, Chat, HealthAndSafety, East, KeyboardDoubleArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  { 
    icon: <Map />, 
    title: "Spot Requests", 
    desc: "Open the map to see real-time help requests near your location." 
  },
  { 
    icon: <Chat />, 
    title: "Connect Fast", 
    desc: "Chat instantly with your neighbor to coordinate the help safely." 
  },
  { 
    icon: <HealthAndSafety />, 
    title: "Earn Trust", 
    desc: "Get rated and earn badges for your kindness and contributions." 
  }
];

const HowItWorks = () => {
  return (
    <Box component="section" className="hiw-section">
      <Container maxWidth="lg">
        <div className="hiw-header">
          <Typography variant="h3" className="hiw-main-title">
            How It Works
          </Typography>
          <div className="hiw-title-line"></div>
        </div>

        <Box className="hiw-steps-container">
          {steps.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div 
                className="hiw-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="hiw-icon-wrapper">
                  {item.icon}
                  <span className="hiw-step-number">{index + 1}</span>
                </div>
                <Typography variant="h6" className="hiw-step-title">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="hiw-step-desc">
                  {item.desc}
                </Typography>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hiw-connector">
                  <East className="connector-arrow-desktop" />
                  <KeyboardDoubleArrowDown className="connector-arrow-mobile" />
                </div>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;