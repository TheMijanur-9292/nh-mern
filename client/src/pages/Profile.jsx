import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Paper, Typography, Avatar, Grid, 
  Card, CardContent, Chip, IconButton, Stack, CircularProgress, Divider, Rating 
} from '@mui/material';
import { Delete, Email, HelpOutline, Schedule, VerifiedUser, Star } from '@mui/icons-material';
import axios from 'axios';

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // ডাটাবেস থেকে ইউজারের লেটেস্ট তথ্য রাখার জন্য
  
  const [currentUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser ? { ...savedUser, id: savedUser.id || savedUser._id } : null;
  });

  useEffect(() => {
    if (currentUser?.id) {
      fetchUserPosts();
      fetchUserInfo(); // ইউজারের রেটিং ও ব্যাজ আনার জন্য
    }
  }, [currentUser]);

  // ইউজারের লেটেস্ট রেটিং এবং ব্যাজ ডাটাবেস থেকে আনা
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${currentUser.id}`);
      setUserData(res.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/user/${currentUser.id}`);
      setUserPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this help request?")) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`);
        setUserPosts(userPosts.filter(post => post._id !== postId));
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  if (!currentUser) return <Typography align="center" sx={{ mt: 5 }}>Please Login to view profile</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ১. প্রোফাইল ইনফো কার্ড (রেটিং ও ব্যাজ সহ) */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: '20px', mb: 4, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* ব্যাকগ্রাউন্ডে হালকা ডিজাইন */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', bgcolor: '#764ba2' }} />
        
        <Avatar 
          sx={{ width: 110, height: 110, mx: 'auto', mb: 2, bgcolor: '#764ba2', fontSize: '3rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
        >
          {currentUser.name?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h4" fontWeight="900" sx={{ color: '#2d3436' }}>{currentUser.name}</Typography>
        
        {/* রেটিং সেকশন */}
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
          <Rating 
            value={userData?.ratings?.average || 0} 
            readOnly 
            precision={0.5} 
            size="small"
            emptyIcon={<Star style={{ opacity: 0.3 }} fontSize="inherit" />}
          />
          <Typography variant="body2" fontWeight="700" color="text.primary">
            {userData?.ratings?.average || "0"} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({userData?.ratings?.count || 0} reviews)
          </Typography>
        </Stack>

        {/* ব্যাজ ডিসপ্লে */}
        <Chip 
          label={userData?.badge || "New Neighbor"} 
          size="small"
          icon={<VerifiedUser sx={{ fontSize: '1rem !important', color: '#fff !important' }} />}
          sx={{ 
            mt: 2, 
            px: 1,
            fontWeight: 'bold', 
            bgcolor: '#764ba2', 
            color: '#fff',
            height: '28px',
            '& .MuiChip-label': { px: 1 }
          }}
        />

        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ color: 'text.secondary', mt: 2 }}>
          <Email fontSize="small" />
          <Typography variant="body2">{currentUser.email}</Typography>
        </Stack>
      </Paper>

      {/* ২. ইউজারের পোস্ট সেকশন */}
      <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#2d3436' }}>
        <HelpOutline sx={{ color: '#764ba2' }} /> My Help Requests
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
      ) : userPosts.length > 0 ? (
        <Grid container spacing={2}>
          {userPosts.map((post) => (
            <Grid item xs={12} key={post._id}>
              <Card sx={{ borderRadius: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '16px !important' }}>
                  <Box>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      sx={{ mb: 1, bgcolor: '#f3f0ff', color: '#764ba2', fontWeight: 'bold', fontSize: '0.7rem' }} 
                    />
                    <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#2d3436' }}>{post.title}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
                      <Schedule sx={{ fontSize: 14 }} />
                      <Typography variant="caption" fontWeight="600">Expires in 24 hours</Typography>
                    </Stack>
                  </Box>
                  <IconButton 
                    onClick={() => handleDeletePost(post._id)}
                    sx={{ color: '#ff4757', bgcolor: '#fff1f2', '&:hover': { bgcolor: '#ffdee1' } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: '#f9f9f9', borderRadius: '20px', border: '2px dashed #eee' }}>
          <Typography color="text.secondary" fontWeight="600">You have no active help requests.</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Profile;