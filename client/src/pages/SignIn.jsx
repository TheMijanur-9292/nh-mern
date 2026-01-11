import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Grid, Stack, IconButton, InputAdornment, Alert, Snackbar, Container, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff, Email, Lock, VolunteerActivism } from '@mui/icons-material';
import axios from 'axios';

// ১. ব্যাকএন্ড বেস ইউআরএল সেটআপ
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SignIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
     // const res = await axios.post('http://localhost:5000/api/users/signin', formData);
      
      const res = await axios.post(`${API_BASE_URL}/api/users/signin`, formData);

      // 🔥 ফিক্সড: ব্যাকএন্ড সরাসরি ইউজার অবজেক্ট পাঠায়, তাই res.data ব্যবহার করুন
      // এবং নিশ্চিত করুন id অথবা _id প্রোপার্টি আছে
      const userData = res.data;
      localStorage.setItem('user', JSON.stringify(userData));
      
      // 🔥 সবচেয়ে জরুরি: নেভবারকে সিগন্যাল পাঠানো যাতে বাটন সাথে সাথে বদলে যায়
      window.dispatchEvent(new Event('auth-change'));
      
      setToast({ open: true, message: 'Login Successful! Welcome back.', severity: 'success' });
      
      // ১.৫ সেকেন্ড পর ম্যাপ পেজে নিয়ে যাবে
      setTimeout(() => navigate('/map'), 1500);
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
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 3, md: 0 }
    }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={0} sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: '20px',
            background: 'white',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.1)'
          }}>
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
                textAlign: 'center'
              }}>
                <Box sx={{
                  height: { xs: 60, md: 70 },
                  width: { xs: 60, md: 70 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(99, 102, 241, 0.25)'
                }}>
                  <VolunteerActivism sx={{ color: 'white', fontSize: { xs: 32, md: 40 } }} />
                </Box>
                
                <Typography variant="h5" sx={{ 
                  fontWeight: 'bold', 
                  mb: 0.5,
                  background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  NeighborHelp
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  Community Support Platform
                </Typography>
              </Box>
            </motion.div>

            <Divider sx={{ my: 3, bgcolor: 'rgba(99, 102, 241, 0.1)' }} />

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1f2937' }}>
                  Sign In
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Access your account and help your community
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField 
                    fullWidth 
                    label="Email Address" 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><Email sx={{ color: '#6366F1' }} /></InputAdornment> 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f3f4f6',
                        '& fieldset': { borderColor: '#e5e7eb' },
                        '&:hover fieldset': { borderColor: '#6366F1' },
                        '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                      },
                      '& .MuiOutlinedInput-input': { py: 1.5 }
                    }}
                  />
                  
                  <TextField 
                    fullWidth 
                    label="Password" 
                    name="password" 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#6366F1' }} /></InputAdornment>,
                      endAdornment: <InputAdornment position="end">
                        <IconButton 
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#6b7280' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f3f4f6',
                        '& fieldset': { borderColor: '#e5e7eb' },
                        '&:hover fieldset': { borderColor: '#6366F1' },
                        '&.Mui-focused fieldset': { borderColor: '#6366F1' },
                      },
                      '& .MuiOutlinedInput-input': { py: 1.5 }
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="contained" 
                      fullWidth
                      size="large" 
                      type="submit" 
                      disabled={loading}
                      sx={{ 
                        background: 'linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)',
                        borderRadius: '12px', 
                        py: 1.5, 
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.25)',
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.35)',
                          background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
                        },
                        '&:disabled': {
                          opacity: 0.6,
                        }
                      }}
                    >
                      {loading ? 'Authenticating...' : 'Sign In'}
                    </Button>
                  </motion.div>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Forgot password?{' '}
                      <Link to="#" style={{ color: '#6366F1', fontWeight: '600', textDecoration: 'none' }}>
                        Reset here
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </motion.div>

            <Divider sx={{ my: 3, bgcolor: 'rgba(99, 102, 241, 0.1)' }} />

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  New to NeighborHelp?{' '}
                  <Link 
                    to="/signup" 
                    style={{ 
                      color: '#6366F1', 
                      fontWeight: 'bold', 
                      textDecoration: 'none' 
                    }}
                  >
                    Create Account
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Paper>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block',
                textAlign: 'center',
                color: '#9ca3af',
                mt: 3
              }}
            >
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </motion.div>
        </motion.div>
      </Container>

      {/* Toast Notifications */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity={toast.severity} 
          variant="filled" 
          sx={{ width: '100%', fontWeight: 'bold' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignIn;
