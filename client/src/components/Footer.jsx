import React from 'react';
import { Box, Container, Typography, Grid, Stack, IconButton, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  VolunteerActivism, 
  Email, 
  LocationOn 
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#121212', 
        color: '#fff', 
        pt: 8, 
        pb: 4, 
        borderTop: '5px solid #764ba2' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          
          {/* ১. লোগো এবং বর্ণনা */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <VolunteerActivism sx={{ color: '#764ba2', fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: '900', letterSpacing: '-1px' }}>
                NeighborHelp
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: '#aaa', lineHeight: 1.8, mb: 3 }}>
              আমরা বিশ্বাস করি প্রযুক্তির মাধ্যমে প্রতিবেশীদের মধ্যে পারস্পরিক সহযোগিতা এবং বিশ্বাসের একটি মজবুত কমিউনিটি তৈরি করা সম্ভব। আপনার বিপদে আমরা আছি আপনার পাশেই।
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

          {/* ২. কুইক লিঙ্কস (আপনার তৈরি পেজগুলো) */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Quick Links</Typography>
            <Stack spacing={1.5}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Find Help (Map)', path: '/map' },
                { name: 'Success Stories', path: '/success-stories' },
                { name: 'Safety Guide', path: '/safety' }
              ].map((link) => (
                <MuiLink 
                  key={link.name}
                  component={Link} 
                  to={link.path}
                  sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#764ba2' } }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* ৩. সাপোর্ট এবং লিগ্যাল */}
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
                  sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#764ba2' } }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* ৪. কন্টাক্ট ইনফো */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Contact Info</Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Email sx={{ color: '#764ba2' }} />
                <Typography variant="body2" sx={{ color: '#aaa' }}>support@neighborhelp.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <LocationOn sx={{ color: '#764ba2' }} />
                <Typography variant="body2" sx={{ color: '#aaa' }}>Dhaka, Bangladesh - 1200</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            &copy; {new Date().getFullYear()} **NeighborHelp**. Developed with ❤️ by Founder.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;