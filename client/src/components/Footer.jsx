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
        bgcolor: '#0a0a0a', 
        color: '#fff', 
        pt: 8, 
        pb: 4, 
        borderTop: '5px solid #1e90ff' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          
          {/* 1. Brand Section */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <VolunteerActivism sx={{ color: '#1e90ff', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: '900', letterSpacing: '-1px' }}>
                NeighborHelp
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#aaa', lineHeight: 1.8, mb: 3 }}>
              Building a strong community of mutual help and trust. We use technology to connect neighbors during emergencies and everyday needs.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <Facebook />, color: '#1877F2' },
                { icon: <Twitter />, color: '#1DA1F2' },
                { icon: <Instagram />, color: '#E4405F' },
                { icon: <LinkedIn />, color: '#0077b5' }
              ].map((social, index) => (
                <IconButton 
                  key={index}
                  sx={{ 
                    color: '#fff', 
                    bgcolor: 'rgba(255,255,255,0.05)', 
                    '&:hover': { bgcolor: social.color, transform: 'translateY(-3px)' },
                    transition: 'all 0.3s'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* 2. Platform Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Platform</Typography>
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
                  sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#1e90ff' }, fontSize: '0.9rem' }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* 3. Support Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Support</Typography>
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
                  sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#1e90ff' }, fontSize: '0.9rem' }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* 4. Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Stay Updated</Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
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
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: '30px',
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: '30px',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  }
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                sx={{ 
                  position: 'absolute', right: 4, top: 4, borderRadius: '25px',
                  minWidth: '40px', bgcolor: '#1e90ff',
                  '&:hover': { bgcolor: '#0070e0' }
                }}
              >
                <Send sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.1)' }} />

        {/* Footer Bottom with Credit */}
        <Box sx={{ 
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', alignItems: 'center', gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            &copy; {new Date().getFullYear()} NeighborHelp. All rights reserved.
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#888' }}>
            Developed & Designed by{' '}
            <MuiLink 
              href="https://github.com/themijanur-9292" 
              target="_blank" 
              sx={{ color: '#1e90ff', fontWeight: '700', textDecoration: 'none' }}
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