import React, { useState } from 'react';
import { 
  Paper, Typography, MenuList, MenuItem, ListItemIcon, 
  ListItemText, Box, Button, Drawer, IconButton, Divider, Chip 
} from '@mui/material';
import { motion } from 'framer-motion';
// আইকন ইম্পোর্টগুলো আলাদাভাবে দেওয়া হলো যাতে ভুল না হয়
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';

const FilterBar = ({ filter, setFilter, posts }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = [
    { name: 'All', icon: '🌍', color: '#333' },
    { name: 'Emergency', icon: '🚨', color: '#ff4757' },
    { name: 'Medical', icon: '💊', color: '#1e90ff' },
    { name: 'Groceries', icon: '🛒', color: '#2ed573' },
    { name: 'Food', icon: '🍔', color: '#ffa502' },
    { name: 'Lost & Found', icon: '🔍', color: '#a29bfe' },
    { name: 'Transport', icon: '🚗', color: '#747d8c' },
    { name: 'Blood', icon: '🩸', color: '#ff6b81' },
    { name: 'Repairs', icon: '🔧', color: '#5352ed' },
    { name: 'Pet Care', icon: '🐾', color: '#eccc68' },
  ];

  const getCategoryCount = (catName) => {
    if (!posts) return 0;
    if (catName === 'All') return posts.length;
    return posts.filter(p => p.category === catName).length;
  };

  const handleCategorySelect = (name) => {
    setFilter(name);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* ১. ডেস্কটপ ভিউ (Compact Sidebar) */}
      <Paper
        elevation={4}
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1000,
          width: 210,
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: 1.5,
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ fontWeight: '800', textAlign: 'center', mb: 1, color: '#2d3436', textTransform: 'uppercase', fontSize: '0.8rem' }}
        >
          Live Requests ({posts?.length || 0})
        </Typography>

        <MenuList sx={{ padding: 0 }}>
          {categories.map((cat) => {
            const count = getCategoryCount(cat.name);
            const isSelected = filter === cat.name;
            return (
              <MenuItem
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                selected={isSelected}
                sx={{
                  borderRadius: '10px',
                  mb: 0.3,
                  paddingY: '4px',
                  '&.Mui-selected': {
                    backgroundColor: `${cat.color}15`, 
                    color: cat.color,
                    borderLeft: `4px solid ${cat.color}`,
                  }
                }}
              >
                <ListItemIcon sx={{ fontSize: '1.2rem', minWidth: '30px' }}>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isSelected ? 700 : 500 }} />
                <Box sx={{ bgcolor: isSelected ? cat.color : '#f1f2f6', color: isSelected ? '#fff' : '#636e72', borderRadius: '10px', px: 1, fontSize: '0.7rem', fontWeight: 'bold' }}>{count}</Box>
              </MenuItem>
            );
          })}
        </MenuList>
      </Paper>

      {/* ২. মোবাইল ভিউ বাটন */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
        <Button
          variant="contained"
          onClick={() => setIsDrawerOpen(true)}
          startIcon={<CategoryIcon />}
          sx={{
            borderRadius: '30px',
            textTransform: 'none',
            fontWeight: 'bold',
            bgcolor: '#764ba2',
            '&:hover': { bgcolor: '#5b3a7d' }
          }}
        >
          {filter === 'All' ? 'Categories' : filter}
        </Button>
      </Box>

      {/* মোবাইল ড্রয়ার */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { width: '280px', borderRadius: '0 20px 20px 0', padding: 2 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Categories</Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <MenuList sx={{ padding: 0 }}>
          {categories.map((cat) => {
            const count = getCategoryCount(cat.name);
            const isSelected = filter === cat.name;
            return (
              <MenuItem
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                sx={{
                  borderRadius: '12px',
                  mb: 1,
                  paddingY: 1,
                  backgroundColor: isSelected ? `${cat.color}15` : 'transparent',
                }}
              >
                <ListItemIcon sx={{ fontSize: '1.5rem', minWidth: '40px' }}>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} primaryTypographyProps={{ fontWeight: isSelected ? 'bold' : '500' }} />
                <Chip label={count} size="small" sx={{ bgcolor: isSelected ? cat.color : '#eee', color: isSelected ? '#fff' : '#666' }} />
              </MenuItem>
            );
          })}
        </MenuList>
      </Drawer>
    </>
  );
};

export default FilterBar;