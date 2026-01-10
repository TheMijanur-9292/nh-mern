import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowBack, Gavel, CheckCircle, Warning, Block, Assignment, Shield } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsOfUse = () => {
  // পেজ লোড হলে একদম উপরে স্ক্রল করবে
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: <Assignment color="primary" />,
      content: "By accessing and using NeighborHelp, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these terms, you must discontinue use of our service immediately."
    },
    {
      title: "Community Guidelines",
      icon: <CheckCircle color="success" />,
      content: "NeighborHelp is built on trust. You agree to treat all neighbors with respect. Harassment, hate speech, discrimination, or any form of abusive behavior will not be tolerated and may result in immediate account suspension."
    },
    {
      title: "User Responsibilities",
      icon: <Shield color="primary" />,
      content: "You are responsible for maintaining the confidentiality of your account credentials. All activities that occur under your account are your responsibility. Please report any unauthorized use of your account immediately."
    },
    {
      title: "Prohibited Activities",
      icon: <Block color="error" />,
      content: "Users may not use the platform for illegal activities, spamming, distributing malware, or collecting user data without consent. Fake help requests or misuse of the emergency alert system is strictly prohibited."
    },
    {
      title: "Safety & Liability",
      icon: <Warning color="warning" />,
      content: "While we strive to verify users, NeighborHelp cannot guarantee the true identity or intentions of any user. Interactions with others are at your own risk. We are not liable for any damages arising from your use of the platform."
    }
  ];

  return (
    <>
      <Box sx={{ bgcolor: '#f8f9fb', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="md">
          {/* Back Button */}
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ mb: 3, bgcolor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', '&:hover': { bgcolor: '#f3f0ff' } }}
          >
            <ArrowBack sx={{ color: '#764ba2' }} />
          </IconButton>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden' }}>
              
              {/* Header Section */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ 
                  display: 'inline-flex', 
                  p: 2, 
                  borderRadius: '50%', 
                  bgcolor: '#f3f0ff', 
                  mb: 2 
                }}>
                  <Gavel sx={{ fontSize: 40, color: '#764ba2' }} />
                </Box>
                <Typography variant="h3" fontWeight="900" gutterBottom>
                  Terms of Use
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please read these terms carefully before using our platform.
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1, color: '#999' }}>
                  Last Updated: January 2026
                </Typography>
              </Box>

              <Divider sx={{ mb: 6 }} />

              {/* Terms List */}
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {termsSections.map((section, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ p: 0 }}>
                    <ListItemIcon sx={{ minWidth: '50px', mt: 0.5 }}>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#2d3748' }}>
                          {index + 1}. {section.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ color: '#4a5568', lineHeight: 1.7 }}>
                          {section.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {/* Bottom Note */}
              <Box sx={{ mt: 8, p: 4, bgcolor: '#fff5f5', borderRadius: '16px', border: '1px solid #feb2b2' }}>
                <Typography variant="h6" color="error" gutterBottom fontWeight="bold">
                  Disclaimer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  NeighborHelp is a community platform. We do not employ the helpers and are not responsible for their actions. In case of a real emergency, please call your local emergency number (e.g., 999) immediately instead of posting here.
                </Typography>
              </Box>

            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Footer Import */}
      <Footer />
    </>
  );
};

export default TermsOfUse;