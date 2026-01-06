import React, { useState } from 'react';
import { 
  Box, Container, Grid, Typography, TextField, Button, 
  Paper, Stack, IconButton, Snackbar, Alert 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Email, Phone, LocationOn, Send, 
  Facebook, LinkedIn, Instagram, Twitter 
} from '@mui/icons-material';
import Footer from '../components/Footer';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ open: true, message: 'Message sent successfully!', severity: 'success' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box className="contact-root-dark">
      <Container maxWidth="lg" className="contact-main-wrap">
        
        {/* Top Header */}
        <Box className="header-text-area">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="overline" className="top-tag-neon">CONTACT US</Typography>
            <Typography variant="h2" className="top-h2-white">Let's <span className="grad-span">Connect</span> With Us</Typography>
            <Typography variant="body1" className="top-p-gray">
              Have questions, feedback, or need assistance? Our dedicated team is here to help you. Reach out to us through any of the channels below or fill out the contact form.
            </Typography>
          </motion.div>
        </Box>

        {/* 1. FORM SECTION (Always Top & Full Width) */}
        <Box className="form-container-full">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Paper className="dark-glass-form" elevation={0}>
              <Typography variant="h4" className="form-h4-white">Send Us a Message</Typography>
              <Typography variant="body1" className="form-p-gray">
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required variant="filled" className="neon-input" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required variant="filled" className="neon-input" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required variant="filled" className="neon-input" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your Message" name="message" value={formData.message} onChange={handleChange} multiline rows={4} required variant="filled" className="neon-input" />
                  </Grid>
                  <Grid item xs={12} className="btn-center">
                    <Button type="submit" variant="contained" className="neon-send-btn" endIcon={<Send />}>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Box>

        {/* 2. INFO SECTION (Laptop side-by-side, Mobile stacked) */}
        <Box className="info-section-grid">
          <Grid container spacing={3}>
            {/* Email Box */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -10 }} className="info-box-vibe">
                <Box className="icon-circle-neon red-neon"><Email /></Box>
                <Typography variant="h6" className="info-title">Email Address</Typography>
                <Typography variant="body1" className="info-val">support@neighborhelp.com</Typography>
                <Typography variant="body2" className="info-sub">We'll respond within 24 hours</Typography>
              </motion.div>
            </Grid>

            {/* Phone Box */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -10 }} className="info-box-vibe">
                <Box className="icon-circle-neon blue-neon"><Phone /></Box>
                <Typography variant="h6" className="info-title">Phone Number</Typography>
                <Typography variant="body1" className="info-val">+91 1234567890</Typography>
                <Typography variant="body2" className="info-sub">Monday to Friday, 9AM to 6PM</Typography>
              </motion.div>
            </Grid>

            {/* Address Box */}
            <Grid item xs={12} md={4}>
              <motion.div whileHover={{ y: -10 }} className="info-box-vibe">
                <Box className="icon-circle-neon green-neon"><LocationOn /></Box>
                <Typography variant="h6" className="info-title">Office Address</Typography>
                <Typography variant="body1" className="info-val">Ecospace, Newtown</Typography>
                <Typography variant="body2" className="info-sub">Kolkata-700156, India</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Social Dock */}
        <Box className="social-dock-center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton className="neon-icon-btn"><Facebook /></IconButton>
            <IconButton className="neon-icon-btn"><LinkedIn /></IconButton>
            <IconButton className="neon-icon-btn"><Twitter /></IconButton>
            <IconButton className="neon-icon-btn"><Instagram /></IconButton>
          </Stack>
        </Box>
        
      </Container>

      <Footer />

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} variant="filled" sx={{ borderRadius: '10px' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;