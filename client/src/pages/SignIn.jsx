import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Grid, Stack, IconButton, InputAdornment, Alert, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import axios from 'axios';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/signin', formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setToast({ open: true, message: 'Login Successful! Welcome back.', severity: 'success' });
      
      // ১.৫ সেকেন্ড পর হোম পেজে নিয়ে যাবে
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ 
        open: true, 
        message: err.response?.data?.message || "Invalid email or password.", 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      {/* বাম পাশের ব্যানার (SignIn থিম) */}
      <Grid item xs={false} sm={4} md={7} sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', color: 'white', px: 5 }}>
        <Box sx={{ zIndex: 1, maxWidth: '600px' }}>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <Typography variant="h3" fontWeight="800" sx={{ mb: 2 }}>Welcome Back!</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.6 }}>Log in to continue your journey within your community.</Typography>
          </motion.div>
        </Box>
      </Grid>

      {/* ডান পাশের ফর্ম */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 450, p: 4 }} component="form" onSubmit={handleSubmit}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">Sign In</Typography>
              <Typography variant="body2" color="text.secondary">Access your NeighborHelp account</Typography>
            </Box>

            <Stack spacing={3}>
              <TextField fullWidth label="Email Address" name="email" type="email" required onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }} />
              <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} required onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />

              <Button variant="contained" size="large" type="submit" disabled={loading} sx={{ bgcolor: '#333', borderRadius: '30px', py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: '#000' } }}>
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>

              <Typography align="center" variant="body2">New to the community? <Link to="/signup" style={{ color: '#00f2fe', fontWeight: 'bold', textDecoration: 'none' }}>Create Account</Link></Typography>
            </Stack>
          </motion.div>
        </Box>
      </Grid>

      {/* প্রফেশনাল পপআপ (Snackbar) */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={handleCloseToast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%', fontWeight: 'bold' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignIn;