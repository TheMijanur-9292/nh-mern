import React, { useState } from 'react';
import { Paper, Typography, Chip, Button, Box } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const MapHelpCard = ({ post, currentUser, onMessageClick }) => {
  const [showFull, setShowFull] = useState(false);

  // ১০টা লেটারের পর View More লজিক
  const description = post.description || "";
  const shouldTruncate = description.length > 10;
  const displayDescription = showFull ? description : description.slice(0, 10);

  return (
    <Paper elevation={0} sx={{ p: 1, minWidth: '220px', maxWidth: '250px' }}>
      {/* ১. টপ-এ ইউজারের নাম */}
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#764ba2' }}>
        {post.username}
      </Typography>

      {/* ২. টাইটেল */}
      <Typography variant="h6" sx={{ fontSize: '1rem', mt: 0.5, fontWeight: '600' }}>
        {post.title}
      </Typography>

      {/* ৩. ক্যাটাগরি */}
      <Chip 
        label={post.category} 
        size="small" 
        sx={{ my: 1, bgcolor: '#f0f2f5', fontWeight: 'bold', fontSize: '0.7rem' }} 
      />

      {/* ৪. ডেসক্রিপশন (১০ লেটার লজিক) */}
      <Typography variant="body2" sx={{ color: '#555', wordBreak: 'break-word' }}>
        {displayDescription}
        {shouldTruncate && !showFull && "..."}
      </Typography>
      
      {shouldTruncate && (
        <Button 
          size="small" 
          onClick={() => setShowFull(!showFull)} 
          sx={{ p: 0, textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', mt: 0.5 }}
        >
          {showFull ? "View Less" : "View More"}
        </Button>
      )}

      {/* ৫. মেসেজ বাটন (যদি নিজের পোস্ট না হয়) */}
      {currentUser?.id !== post.userId && (
        <Button 
          fullWidth 
          variant="contained" 
          startIcon={<ChatIcon />}
          onClick={() => onMessageClick(post.userId, post.username)}
          sx={{ 
            mt: 1.5, 
            bgcolor: '#764ba2', 
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': { bgcolor: '#5b3a7d' } 
          }}
        >
          Message
        </Button>
      )}
    </Paper>
  );
};

export default MapHelpCard;