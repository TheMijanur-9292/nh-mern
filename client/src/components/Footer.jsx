import React from 'react';
import { Box, Container, Typography, Stack, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#1a1a1a', 
        color: '#fff', 
        py: 6, 
        borderTop: '4px solid #764ba2' 
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          NeighborHelp
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
          Building trust, one neighborhood at a time.
        </Typography>

        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          {['About', 'Privacy Policy', 'Contact Support'].map((text) => (
            <MuiLink 
              key={text} 
              href="#" 
              underline="hover" 
              sx={{ color: '#ccc', transition: '0.3s', '&:hover': { color: '#fff' } }}
            >
              {text}
            </MuiLink>
          ))}
        </Stack>

        <Typography variant="body2" sx={{ opacity: 0.5 }}>
          &copy; {new Date().getFullYear()} NeighborHelp. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;