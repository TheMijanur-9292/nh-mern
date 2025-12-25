import React from 'react';
import { 
  Paper, Typography, Box, Button, 
  Avatar, Stack, Divider 
} from '@mui/material';
import { Chat, AccessTime, FiberManualRecord } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MapHelpCard = ({ post, currentUser, onMessageClick }) => {
  const navigate = useNavigate();

  // ১. ক্যাটাগরি অনুযায়ী থিম কালার
  const getCategoryColor = (category) => {
    const colors = {
      'Emergency': '#ff4757',
      'Medical': '#2ed573',
      'Groceries': '#ffa502',
      'Food': '#ff6b81',
      'Lost & Found': '#1e90ff',
      'Transport': '#5352ed',
      'Blood': '#d63031',
      'Repairs': '#2f3542',
      'Pet Care': '#e67e22',
    };
    return colors[category] || '#764ba2';
  };

  const themeColor = getCategoryColor(post.category);

  const handleMessageClick = () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    onMessageClick(post.userId, post.username);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return "1d ago";
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: 260, 
        borderRadius: '12px', 
        p: 2,
        border: `2px solid ${themeColor}`, // Single box look with colored border
        bgcolor: '#ffffff',
        position: 'relative'
      }}
    >
      {/* ১. প্রোফাইল এবং সময় (Header) */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, bgcolor: themeColor, fontSize: '0.85rem', fontWeight: 'bold' }}>
            {post.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle2" fontWeight="800" sx={{ color: '#2d3436' }}>
            {post.username}
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: '600' }}>
          {timeAgo(post.createdAt)}
        </Typography>
      </Stack>

      {/* ২. ক্যাটাগরি ট্যাগ (Sub-header) */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
        <FiberManualRecord sx={{ fontSize: 10, color: themeColor }} />
        <Typography variant="caption" sx={{ fontWeight: 'bold', color: themeColor, textTransform: 'uppercase' }}>
          {post.category}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 1.5, opacity: 0.5 }} />

      {/* ৩. টাইটেল এবং ডেসক্রিপশন */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: '900', mb: 0.5, color: '#2d3436', lineHeight: 1.3 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#636e72', 
          fontSize: '0.85rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.description}
        </Typography>
      </Box>

      {/* ৪. মেসেজ বাটন */}
      <Button
        fullWidth
        variant="contained"
        size="medium"
        disableElevation
        startIcon={<Chat />}
        onClick={handleMessageClick}
        disabled={currentUser?.id === post.userId}
        sx={{ 
          bgcolor: themeColor, 
          color: '#fff',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': { bgcolor: themeColor, filter: 'brightness(0.9)' },
          '&.Mui-disabled': { bgcolor: '#f1f2f6', color: '#b2bec3' }
        }}
      >
        {currentUser?.id === post.userId ? "My Request" : "Message Neighbor"}
      </Button>
    </Paper>
  );
};

export default MapHelpCard;