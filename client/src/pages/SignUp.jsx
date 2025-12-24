import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Grid, Stack, IconButton, InputAdornment, Checkbox, FormControlLabel, Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { Person, Email, Lock, Visibility, VisibilityOff, VerifiedUser } from '@mui/icons-material';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toast State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', formData);
      setToast({ open: true, message: 'Registration Successful! Redirecting...', severity: 'success' });
      
      // ২ সেকেন্ড পর লগইন পেজে পাঠাবে
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setToast({ 
        open: true, 
        message: err.response?.data?.message || "Registration failed. Try again.", 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      {/* বাম পাশের ব্যানার (আগের মতোই থাকবে) */}
      <Grid item xs={false} sm={4} md={7} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', color: 'white', px: 5 }}>
        <Box sx={{ zIndex: 1, maxWidth: '600px' }}>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <VerifiedUser sx={{ fontSize: 60, mb: 2, color: '#ffdf00' }} />
            <Typography variant="h3" fontWeight="800" sx={{ mb: 2 }}>Join the Movement</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.6, fontWeight: 300 }}>Become a verified member of your local community.</Typography>
          </motion.div>
        </Box>
      </Grid>

      {/* ডান পাশের ফর্ম */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 450, p: 4 }} component="form" onSubmit={handleSubmit}>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#764ba2', mb: 1 }}>Create Account</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Join NeighborHelp today for free</Typography>

            <Stack spacing={2.5}>
              <TextField fullWidth label="Full Name" name="name" required onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
              <TextField fullWidth label="Email Address" name="email" type="email" required onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }} />
              <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} required onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />

              <FormControlLabel control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} color="primary" />} label={<Typography variant="caption">I agree to the Terms and Privacy Policy.</Typography>} />

              <Button variant="contained" size="large" type="submit" disabled={!agreed || loading} sx={{ bgcolor: '#764ba2', borderRadius: '30px', py: 1.5, fontWeight: 'bold' }}>
                {loading ? 'Processing...' : 'Register Now'}
              </Button>

              <Typography align="center" variant="body2">Already a member? <Link to="/signin" style={{ color: '#764ba2', fontWeight: 'bold', textDecoration: 'none' }}>Sign In</Link></Typography>
            </Stack>
          </motion.div>
        </Box>
      </Grid>

      {/* প্রফেশনাল পপআপ (Snackbar) */}
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%', fontWeight: 'bold' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignUp;