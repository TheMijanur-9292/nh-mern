import React, { useEffect } from 'react';
import { Box, Container, Typography, Stack, Paper, Divider, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Security, Lock, VisibilityOff, GppGood, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; // ১. ফুটার ইমপোর্ট করা হলো

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Lock color="primary" />,
      title: "Data Protection",
      desc: "Your personal information (Name, Email, Password) is encrypted and stored securely. We never share your credentials with third parties."
    },
    {
      icon: <VisibilityOff color="primary" />,
      title: "Location Privacy",
      desc: "We use your location only to show nearby help requests. For your safety, we add a slight random offset to your exact pin location on the map."
    },
    {
      icon: <Security color="primary" />,
      title: "Chat Encryption",
      desc: "Your conversations with other neighbors are private and encrypted. NeighborHelp staff cannot read your personal messages."
    },
    {
      icon: <GppGood color="primary" />,
      title: "User Control",
      desc: "You have full control over your data. You can delete your posts or request to deactivate your account at any time."
    }
  ];

  return (
    <>
      {/* মেইন কন্টেন্ট সেকশন */}
      <Box sx={{ bgcolor: '#f8f9fb', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="md">
          {/* Back Button */}
          <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, bgcolor: '#fff', '&:hover': { bgcolor: '#f3f0ff' } }}>
            <ArrowBack sx={{ color: '#764ba2' }} />
          </IconButton>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '24px', border: '1px solid #eee' }}>
              <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <Security sx={{ fontSize: 50, color: '#764ba2' }} />
                <Typography variant="h3" fontWeight="900" textAlign="center">
                  Privacy Policy
                </Typography>
                <Typography color="text.secondary">Last updated: January 2026</Typography>
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, textAlign: 'center' }}>
                At NeighborHelp, we take your privacy seriously. This policy outlines how we handle your data to provide a safe and helpful environment for the community.
              </Typography>

              <Divider sx={{ mb: 6 }} />

              <Stack spacing={4}>
                {sections.map((section, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ 
                      bgcolor: '#f3f0ff', 
                      p: 1.5, 
                      borderRadius: '12px', 
                      height: 'fit-content',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {section.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {section.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {section.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ mt: 6, p: 3, bgcolor: '#764ba2', borderRadius: '16px', color: '#fff' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Have questions about your privacy?
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  If you have any concerns regarding your data or our security practices, please contact us at privacy@neighborhelp.com.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* ২. ফুটার কম্পোনেন্ট যুক্ত করা হলো */}
      <Footer />
    </>
  );
};

export default PrivacyPolicy;