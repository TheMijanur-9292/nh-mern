import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Paper, Typography, Avatar, Grid, 
  Card, CardContent, Chip, IconButton, Stack, CircularProgress, Divider, Rating, Button 
} from '@mui/material';
import { 
  Delete, Email, HelpOutline, Schedule, VerifiedUser, Star, 
  Edit, WarningRounded, CheckCircle 
} from '@mui/icons-material';
import axios from 'axios';
import './Profile.css'; // External CSS ফাইল ইমপোর্ট

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  // নতুন স্টেটগুলো
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  
  const [currentUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser ? { ...savedUser, id: savedUser.id || savedUser._id } : null;
  });

  useEffect(() => {
    if (currentUser?.id) {
      fetchUserPosts();
      fetchUserInfo(); 
    }
  }, [currentUser]);

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

  // ১. ডিলিট বাটন চাপলে মডাল ওপেন হবে
  const initiateDelete = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  // ২. মডালের "Yes, Delete" বাটনে চাপলে এটা কল হবে
  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postToDelete}`);
        setUserPosts(userPosts.filter(post => post._id !== postToDelete));
        
        // মডাল বন্ধ করা এবং সাকসেস মেসেজ দেখানো
        setShowDeleteModal(false);
        setShowSuccessMsg(true);
        
        // ৩ সেকেন্ড পর সাকসেস মেসেজ গায়েব হবে
        setTimeout(() => setShowSuccessMsg(false), 3000);
      } catch (err) {
        alert("Failed to delete post");
        setShowDeleteModal(false);
      }
    }
  };

  // ৩. মডাল বন্ধ করার ফাংশন
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  if (!currentUser) return <Typography align="center" sx={{ mt: 5 }}>Please Login to view profile</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      
      {/* ১. প্রোফাইল ইনফো কার্ড (আপডেটেড ডিজাইন) */}
      <Paper elevation={0} className="profile-card-container">
        {/* উপরের রঙিন বার */}
        <div className="profile-top-bar"></div>
        
        <div className="profile-avatar-wrapper">
          <Avatar 
            className="profile-avatar"
            sx={{ width: 120, height: 120, bgcolor: '#764ba2', fontSize: '3.5rem', fontWeight: 'bold' }}
          >
            {currentUser.name?.charAt(0).toUpperCase()}
          </Avatar>
        </div>

        <Box sx={{ textAlign: 'center', px: 3 }}>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#2d3436' }}>{currentUser.name}</Typography>
          
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

          <Chip 
            label={userData?.badge || "New Neighbor"} 
            size="small"
            icon={<VerifiedUser sx={{ fontSize: '1rem !important', color: '#fff !important' }} />}
            sx={{ mt: 2, px: 1, fontWeight: 'bold', bgcolor: '#764ba2', color: '#fff' }}
          />

          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ color: 'text.secondary', mt: 2 }}>
            <Email fontSize="small" />
            <Typography variant="body2">{currentUser.email}</Typography>
          </Stack>

          {/* Edit Profile Button (NEW) */}
          <Button 
            variant="outlined" 
            startIcon={<Edit />} 
            className="edit-profile-btn"
            onClick={() => alert("Edit Profile Feature Coming Soon!")} // এখানে ফিউচার লজিক বসাতে পারেন
          >
            Edit Profile
          </Button>
        </Box>
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
              <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' } }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '20px !important' }}>
                  <Box>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      sx={{ mb: 1, bgcolor: '#f3f0ff', color: '#764ba2', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '6px' }} 
                    />
                    <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#2d3436', fontSize: '1.1rem' }}>{post.title}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, color: '#636e72' }}>
                      <Schedule sx={{ fontSize: 16 }} />
                      <Typography variant="caption" fontWeight="500">Expires in 24 hours</Typography>
                    </Stack>
                  </Box>
                  <IconButton 
                    onClick={() => initiateDelete(post._id)} // ডিলিট মডাল ট্রিগার
                    sx={{ 
                      color: '#ff4757', 
                      bgcolor: '#fff1f2', 
                      width: '45px', height: '45px',
                      borderRadius: '12px',
                      '&:hover': { bgcolor: '#ff4757', color: 'white' } 
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: '#f9f9f9', borderRadius: '20px', border: '2px dashed #e0e0e0' }}>
          <Typography color="text.secondary" fontWeight="600">You have no active help requests.</Typography>
        </Paper>
      )}

      {/* --- CUSTOM DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-icon">
              <WarningRounded fontSize="inherit" />
            </div>
            <Typography className="modal-title">Delete Request?</Typography>
            <Typography className="modal-desc">
              Are you sure you want to remove this help request? This action cannot be undone.
            </Typography>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>No, Keep it</button>
              <button className="btn-confirm" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS MESSAGE TOAST --- */}
      {showSuccessMsg && (
        <div className="success-toast">
          <CheckCircle sx={{ color: '#fff' }} />
          <Typography variant="body2" fontWeight="600">Request deleted successfully!</Typography>
        </div>
      )}

    </Container>
  );
};

export default Profile;