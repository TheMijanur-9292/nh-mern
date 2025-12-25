import React, { useState } from 'react';
import { 
  Box, Container, Typography, Paper, Avatar, Stack, 
  IconButton, Button, Grid, Chip, Divider 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Favorite, 
  FavoriteBorder, 
  ChatBubbleOutline, 
  Share, 
  AddCircleOutline,
  VolunteerActivism
} from '@mui/icons-material';

const SuccessStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      name: "Arif Ahmed",
      badge: "Super Neighbor 🏆",
      avatar: "A",
      time: "2 hours ago",
      story: "গত রাতে হঠাৎ আমার বাচ্চার জন্য একটি বিশেষ ওষুধের প্রয়োজন ছিল। অনেক খুঁজেও পাচ্ছিলাম না। এই অ্যাপে রিকোয়েস্ট দেওয়ার মাত্র ১০ মিনিটের মধ্যে পাশের ব্লকের সুমি আপু ওষুধটি নিয়ে বাসায় চলে আসেন। কৃতজ্ঞতা জানাই!",
      likes: 24,
      liked: true,
      category: "Medical"
    },
    {
      id: 2,
      name: "Sumaiya Akhter",
      badge: "Helpful Neighbor ✨",
      avatar: "S",
      time: "1 day ago",
      story: "আমার বাগানের কিছু গাছ লাগানোর জন্য সাহায্যের প্রয়োজন ছিল। রবিন ভাই এসে পুরো বিকেলটা সাহায্য করেছেন। এই প্ল্যাটফর্মের মাধ্যমেই আমাদের পরিচয় হলো। প্রতিবেশী হিসেবে এমন মানুষ পাওয়া ভাগ্যের ব্যাপার!",
      likes: 45,
      liked: false,
      category: "Repairs"
    }
  ]);

  const handleLike = (id) => {
    setStories(stories.map(s => 
      s.id === id ? { ...s, likes: s.liked ? s.likes - 1 : s.likes + 1, liked: !s.liked } : s
    ));
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <VolunteerActivism sx={{ fontSize: 50, color: '#764ba2', mb: 1 }} />
            <Typography variant="h3" fontWeight="900">Success <span style={{ color: '#764ba2' }}>Stories</span></Typography>
            <Typography variant="body1" color="text.secondary">দেখুন কিভাবে আপনার প্রতিবেশীরা একে অপরের পাশে দাঁড়াচ্ছে।</Typography>
          </motion.div>
          
          <Button 
            variant="contained" 
            startIcon={<AddCircleOutline />}
            sx={{ 
              mt: 3, bgcolor: '#764ba2', borderRadius: '30px', px: 4, py: 1.2,
              textTransform: 'none', fontWeight: 'bold', fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(118, 75, 162, 0.3)'
            }}
          >
            Share Your Story
          </Button>
        </Box>

        {/* Stories Feed */}
        <Stack spacing={4}>
          {stories.map((story, index) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 2, md: 4 }, 
                  borderRadius: '24px', 
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)' 
                }}
              >
                {/* User Info Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: '#764ba2', width: 50, height: 50 }}>{story.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="800">{story.name}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" color="text.secondary">{story.time}</Typography>
                        <Chip label={story.badge} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#f3f0ff', color: '#764ba2' }} />
                      </Stack>
                    </Box>
                  </Stack>
                  <Chip label={story.category} size="small" variant="outlined" color="primary" sx={{ borderRadius: '8px' }} />
                </Stack>

                {/* Content */}
                <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.8, mb: 3 }}>
                  "{story.story}"
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                {/* Actions */}
                <Stack direction="row" spacing={3}>
                  <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => handleLike(story.id)}>
                    <IconButton size="small" color={story.liked ? "error" : "default"}>
                      {story.liked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2" fontWeight="600">{story.likes}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer', color: 'text.secondary' }}>
                    <IconButton size="small"><ChatBubbleOutline fontSize="small" /></IconButton>
                    <Typography variant="body2" fontWeight="600">Comment</Typography>
                  </Stack>
                  <IconButton size="small" sx={{ ml: 'auto' }}><Share fontSize="small" /></IconButton>
                </Stack>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default SuccessStories;