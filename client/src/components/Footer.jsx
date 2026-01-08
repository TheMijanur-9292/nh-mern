import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Stack, IconButton, 
  Link as MuiLink, Divider, TextField, Button 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, LinkedIn, 
  VolunteerActivism, Email, LocationOn, Send 
} from '@mui/icons-material';

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you! updates will be sent to: ${subscribeEmail}`);
    setSubscribeEmail("");
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#ffffff', 
        color: '#1f2937', 
        pt: 8, 
        pb: 4, 
        borderTop: '2px solid rgba(99, 102, 241, 0.2)' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          
          {/* 1. Brand Section */}
          <Grid item xs={12} md={3.5}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <VolunteerActivism sx={{ background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: '900', letterSpacing: '-1px', background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NeighborHelp
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6, mb: 3, fontSize: '0.85rem' }}>
              Building a strong community of mutual help and trust. We connect neighbors during emergencies and everyday needs.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <Facebook />, color: '#6366F1' },
                { icon: <Twitter />, color: '#14B8A6' },
                { icon: <Instagram />, color: '#6366F1' },
                { icon: <LinkedIn />, color: '#14B8A6' }
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  sx={{ 
                    color: '#fff', 
                    background: `linear-gradient(135deg, ${social.color} 0%, #14B8A6 100%)`,
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 8px 16px ${social.color}40` },
                    transition: 'all 0.3s'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* 2. Platform Links */}
          <Grid item xs={12} sm={4} md={2.8}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937', fontSize: '0.95rem' }}>Platform</Typography>
            <Stack spacing={1.5}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Find Help', path: '/map' },
                { name: 'Success Stories', path: '/success-stories' },
                { name: 'Safety Guide', path: '/safety' }
              ].map((link) => (
                <MuiLink 
                  key={link.name}
                  component={Link} 
                  to={link.path}
                  sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#6366F1', fontWeight: '600' }, fontSize: '0.9rem', transition: 'all 0.3s' }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* 3. Support Links */}
          <Grid item xs={12} sm={4} md={2.8}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937', fontSize: '0.95rem' }}>Support</Typography>
            <Stack spacing={1.5}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Use', path: '#' }
              ].map((link) => (
                <MuiLink 
                  key={link.name}
                  component={Link} 
                  to={link.path}
                  sx={{ color: '#6b7280', textDecoration: 'none', '&:hover': { color: '#14B8A6', fontWeight: '600' }, fontSize: '0.9rem', transition: 'all 0.3s' }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* 4. Newsletter Section */}
          <Grid item xs={12} sm={4} md={2.9}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937', fontSize: '0.95rem' }}>Stay Updated</Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: '0.85rem' }}>
              Subscribe for email notifications about help requests near you.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                placeholder="Email Address"
                size="small"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: '30px',
                  '& .MuiOutlinedInput-root': {
                    color: '#1f2937',
                    borderRadius: '30px',
                    '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.3)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366F1' }
                  },
                  '& .MuiOutlinedInput-input::placeholder': { color: '#9ca3af', opacity: 1 }
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                sx={{ 
                  position: 'absolute', right: 4, top: 4, borderRadius: '25px',
                  minWidth: '40px', background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
                  '&:hover': { boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)' }
                }}
              >
                <Send sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, bgcolor: 'rgba(99, 102, 241, 0.1)' }} />

        {/* Footer Bottom with Credit */}
        <Box sx={{ 
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', alignItems: 'center', gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()} NeighborHelp. All rights reserved.
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Developed & Designed by{' '}
            <MuiLink 
              href="https://github.com/themijanur-9292" 
              target="_blank" 
              sx={{ background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', textDecoration: 'none' }}
            >
              Md Mijanur Molla
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;