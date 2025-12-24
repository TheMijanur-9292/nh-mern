import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, FormControlLabel, Checkbox, Typography, Stack, Alert } from '@mui/material';
import axios from 'axios';

const categories = ["Emergency", "Medical", "Groceries", "Food", "Lost & Found", "Transport", "Blood", "Repairs", "Pet Care"];

const RequestForm = ({ open, onClose, currentLocation, refreshPosts }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', contact: '' });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // ১. ফিল্ড ভ্যালিডেশন
    if (!formData.title || !formData.category || !formData.description || !formData.contact) {
      setError('সবগুলো ঘর পূরণ করুন।');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // ২. লোকাল স্টোরেজ থেকে ইউজারের ডাটা চেক
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (!loggedInUser) {
        setError('সেশন শেষ হয়ে গেছে, দয়া করে আবার লগইন করুন।');
        setLoading(false);
        return;
      }

      // ৩. ডাটা অবজেক্ট তৈরি (ব্যাকএন্ডের মডেল অনুযায়ী)
      const postData = {
    title: formData.title,
    description: formData.description,
    category: formData.category,
    contact: formData.contact,
    location: currentLocation,
    // এখানে ভালো করে দেখো, আইডি যেন মিস না হয়
    userId: loggedInUser.id || loggedInUser._id, 
    username: loggedInUser.name
      };

      // ৪. এপিআই কল
      const response = await axios.post('http://localhost:5000/api/posts', postData);
      
      if (response.status === 201 || response.status === 200) {
        refreshPosts(); // ম্যাপ আপডেট করা
        setFormData({ title: '', description: '', category: '', contact: '' });
        onClose();
      }
    } catch (err) {
      console.error("Post Error:", err.response?.data);
      setError(err.response?.data?.message || 'পোস্ট করা সম্ভব হয়নি। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Create Help Request 🆘</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Title" name="title" fullWidth value={formData.title} onChange={handleChange} />
          <TextField select label="Category" name="category" fullWidth value={formData.category} onChange={handleChange}>
            {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>
          <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} />
          <TextField label="Contact Info" name="contact" fullWidth value={formData.contact} onChange={handleChange} />
          <FormControlLabel control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />} label="I agree to share my location." />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !agreed} sx={{ bgcolor: '#ff4757' }}>
          {loading ? 'Posting...' : 'Post Request'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestForm;