import React, { useState } from 'react';
import { 
  Box, Container, Grid, Typography, TextField, Button, 
  Paper, Stack, IconButton, Snackbar, Alert 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Email, Phone, LocationOn, Send, 
  Facebook, LinkedIn, Instagram, Twitter, SupportAgent 
} from '@mui/icons-material';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনি আপনার ব্যাকএন্ড এপিআই কল করতে পারেন
    console.log("Contact Form Data:", formData);
    setToast({ open: true, message: 'Thank you! Your message has been sent.', severity: 'success' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: <Email />, label: "Email Us", value: "support@neighborhelp.com", color: '#764ba2' },
    { icon: <Phone />, label: "Call Us", value: "+880 1234 567 890", color: '#667eea' },
    { icon: <LocationOn />, label: "Our Office", value: "Dhaka, Bangladesh", color: '#ff4757' }
  ];

  return (
    <Box sx={{ bgcolor: '#f8f9fb', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography variant="overline" sx={{ color: '#764ba2', fontWeight: 'bold', letterSpacing: 2 }}>
              Get In Touch
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
              We're Here to <span style={{ color: '#764ba2' }}>Help</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              আপনার কোনো প্রশ্ন, ফিডব্যাক বা সাহায্যের প্রয়োজন থাকলে আমাদের জানান। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5}>
          {/* ১. কন্টাক্ট ইনফরমেশন কার্ডস */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #eee' }}>
                    <Box sx={{ bgcolor: info.color, color: '#fff', p: 1.5, borderRadius: '12px', display: 'flex' }}>
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold">{info.label}</Typography>
                      <Typography variant="body1" fontWeight="bold">{info.value}</Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}

              <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', bgcolor: '#764ba2', color: '#fff', textAlign: 'center' }}>
                <SupportAgent sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold">24/7 Support</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>Emergency requests are handled with top priority.</Typography>
                <Stack direction="row" justifyContent="center" spacing={1}>
                  {[<Facebook />, <Twitter />, <LinkedIn />, <Instagram />].map((icon, i) => (
                    <IconButton key={i} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                      {icon}
                    </IconButton>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* ২. কন্টাক্ট ফর্ম */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '30px', border: '1px solid #eee' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>Send us a Message</Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required variant="filled" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required variant="filled" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required variant="filled" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="How can we help?" name="message" value={formData.message} onChange={handleChange} multiline rows={4} required variant="filled" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        size="large" 
                        endIcon={<Send />}
                        sx={{ 
                          bgcolor: '#764ba2', 
                          px: 6, 
                          py: 1.5, 
                          borderRadius: '30px',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          '&:hover': { bgcolor: '#5b3a7d' } 
                        }}
                      >
                        Submit Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;