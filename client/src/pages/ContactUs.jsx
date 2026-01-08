import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Grid, Typography, TextField, Button, 
  Stack, IconButton, Snackbar, Alert 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Email, Phone, LocationOn, Send, 
  Facebook, LinkedIn, Instagram, Twitter,
  CheckCircle
} from '@mui/icons-material';
import Footer from '../components/Footer';
import './ContactUs.css';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setToast({ open: true, message: 'Thank you! Your message has been sent successfully.', severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setToast({ open: true, message: 'Please fill in all fields', severity: 'error' });
    }
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email Us',
      value: 'support@neighborhelp.com',
      detail: '24/7 Support Response',
      className: 'cu-icon-red'
    },
    {
      icon: <Phone />,
      title: 'Call Us',
      value: '+880 1234-567890',
      detail: 'Monday - Friday, 9AM-6PM',
      className: 'cu-icon-blue'
    },
    {
      icon: <LocationOn />,
      title: 'Visit Us',
      value: 'Dhaka, Bangladesh',
      detail: 'Headquarters Location',
      className: 'cu-icon-green'
    }
  ];

  return (
    <Box className="cu-root-container">
      <Container maxWidth="lg" className="cu-main-wrapper">
        
        {/* Header Section */}
        <Box className="cu-header-wrapper">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography className="cu-header-tag">Get In Touch</Typography>
            <Typography variant="h2" className="cu-header-title">
              Let's <span className="cu-header-gradient-text">Connect</span> Together
            </Typography>
            <Typography className="cu-header-description">
              Have a question about NeighborHelp? Want to share feedback or report an issue? 
              We'd love to hear from you. Get in touch with our support team and we'll respond as quickly as possible.
            </Typography>
          </motion.div>
        </Box>

        {/* Contact Form Section */}
        <Box className="cu-form-wrapper">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6 }}
          >
            <Box className="cu-form-card">
              <Typography variant="h4" className="cu-form-title">Send Us a Message</Typography>
              <Typography className="cu-form-subtitle">
                Fill out the form below and our team will get back to you within 24 hours.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Your Full Name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      variant="filled" 
                      className="cu-input-field"
                      placeholder="John Doe"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      fullWidth 
                      label="Email Address" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      variant="filled" 
                      className="cu-input-field"
                      placeholder="john@example.com"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                      variant="filled" 
                      className="cu-input-field"
                      placeholder="How can we help you?"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      fullWidth 
                      label="Your Message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      multiline 
                      rows={4} 
                      required 
                      variant="filled" 
                      className="cu-input-field"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      className="cu-submit-button" 
                      endIcon={<Send />}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </motion.div>
        </Box>

        {/* Contact Info Cards Section */}
        <Box className="cu-info-grid-wrapper">
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Box className="cu-info-card">
                    <Box className={`cu-info-icon-box ${info.className}`}>
                      {info.icon}
                    </Box>
                    <Typography variant="h6" className="cu-info-title">
                      {info.title}
                    </Typography>
                    <Typography className="cu-info-value">
                      {info.value}
                    </Typography>
                    <Typography className="cu-info-sub">
                      {info.detail}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Social Links Section */}
        <Box className="cu-social-wrapper">
          <Typography variant="h6" style={{ marginBottom: '20px', color: '#1a1a1a', fontWeight: 700 }}>
            Follow Us On Social Media
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton className="cu-social-icon-btn" title="Facebook">
              <Facebook />
            </IconButton>
            <IconButton className="cu-social-icon-btn" title="LinkedIn">
              <LinkedIn />
            </IconButton>
            <IconButton className="cu-social-icon-btn" title="Instagram">
              <Instagram />
            </IconButton>
            <IconButton className="cu-social-icon-btn" title="Twitter">
              <Twitter />
            </IconButton>
          </Stack>
        </Box>
        
      </Container>

      <Footer />

      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast({ ...toast, open: false })} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ borderRadius: '10px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;