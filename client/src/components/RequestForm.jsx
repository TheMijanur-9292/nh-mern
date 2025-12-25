import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Paper, 
  MenuItem, Checkbox, FormControlLabel, Stack, IconButton, Divider
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon, Cancel as CancelIcon } from '@mui/icons-material';

const RequestForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    agreed: false
  });

  const categories = [
    'Emergency', 'Medical', 'Groceries', 'Food', 
    'Lost & Found', 'Transport', 'Blood', 'Repairs', 'Pet Care'
  ];

  const handleSubmit = () => {
    if (formData.agreed && formData.title && formData.category) {
      onSubmit(formData);
    }
  };

  return (
    <Paper elevation={10} sx={{ 
      p: 3, 
      borderRadius: '16px', 
      maxWidth: '400px', 
      width: '95%',
      position: 'relative',
      background: '#fff',
      border: '1px solid #e0e0e0',
      zIndex: 10 // Ekhane z-index komano holo jate dropdown upore thake
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="800" color="#764ba2">
          Request Help
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
        Ask your neighbors for assistance.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1.8}>
        {/* Title */}
        <TextField
          fullWidth
          label="What do you need?"
          size="small"
          variant="filled"
          placeholder="e.g. Need help with medicine"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />

        {/* Category Dropdown with Fix */}
        <TextField
          fullWidth
          select
          label="Category"
          size="small"
          variant="filled"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          SelectProps={{
            MenuProps: {
              disablePortal: true, // Dropdown-take form-er layer-er pichone jawa theke atkabe
              PaperProps: {
                style: {
                  zIndex: 3000 // Dropdown menu-take sobar upore rakhbe
                },
              },
            },
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: '0.9rem' }}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Description */}
        <TextField
          fullWidth
          label="Short Description"
          multiline
          rows={2}
          size="small"
          variant="filled"
          placeholder="Briefly explain your need..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        {/* Agreement */}
        <FormControlLabel
          control={
            <Checkbox 
              size="small"
              checked={formData.agreed} 
              onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
              sx={{ color: '#764ba2', '&.Mui-checked': { color: '#764ba2' } }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.75rem', color: '#555' }}>
              I agree to share my location for this request.
            </Typography>
          }
        />

        {/* Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<CancelIcon />}
            onClick={onClose}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              fontWeight: '600',
              borderColor: '#ccc'
            }}
          >
            Cancel
          </Button>
          
          <Button
            fullWidth
            variant="contained"
            disabled={!formData.agreed || !formData.title || !formData.category}
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            sx={{ 
              bgcolor: '#764ba2', 
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { bgcolor: '#5b3a7d' },
              '&.Mui-disabled': { bgcolor: '#d1d1d1' }
            }}
          >
            Post
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RequestForm;