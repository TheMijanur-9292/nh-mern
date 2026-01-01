import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Map, Chat, HealthAndSafety, East } from '@mui/icons-material';
import { motion } from 'framer-motion';

// CSS Import
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { 
      icon: <Map sx={{ fontSize: 35 }} />, 
      title: "Spot Requests", 
      desc: "Open the map to see real-time help requests near your location." 
    },
    { 
      icon: <Chat sx={{ fontSize: 35 }} />, 
      title: "Connect Fast", 
      desc: "Chat instantly with your neighbor to coordinate the help safely." 
    },
    { 
      icon: <HealthAndSafety sx={{ fontSize: 35 }} />, 
      title: "Earn Trust", 
      desc: "Get rated and earn badges for your kindness and contributions." 
    }
  ];

  return (
    <Box className="how-it-works-root">
      <Container maxWidth="lg">
        <Typography variant="h3" className="section-title">
          How It Works
        </Typography>

        <Box className="steps-wrapper">
          {steps.map((item, index) => (
            <React.Fragment key={index}>
              {/* Step Box */}
              <motion.div 
                className="step-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="icon-circle">
                  {item.icon}
                </div>
                <Typography variant="h6" className="step-title">
                  {item.title}
                </Typography>
                <Typography variant="body2" className="step-desc">
                  {item.desc}
                </Typography>
              </motion.div>

              {/* Arrow between boxes (Only show between items) */}
              {index < steps.length - 1 && (
                <Box className="step-arrow">
                  <East sx={{ fontSize: 40 }} />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;