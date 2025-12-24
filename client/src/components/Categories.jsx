import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { 
  LocalPharmacy, 
  ShoppingCart, 
  DirectionsCar, 
  Bloodtype, 
  Build, 
  Pets,
  ReportProblem, // Emergency
  Fastfood,      // Food
  Search         // Lost & Found
} from '@mui/icons-material';

const categories = [
  { name: "Emergency", icon: <ReportProblem fontSize="large" />, color: "#ff4757" }, // Red
  { name: "Medical", icon: <LocalPharmacy fontSize="large" />, color: "#1e90ff" }, // Blue
  { name: "Groceries", icon: <ShoppingCart fontSize="large" />, color: "#2ed573" }, // Green
  { name: "Food", icon: <Fastfood fontSize="large" />, color: "#ffa502" }, // Orange
  { name: "Lost & Found", icon: <Search fontSize="large" />, color: "#a29bfe" }, // Purple
  { name: "Transport", icon: <DirectionsCar fontSize="large" />, color: "#747d8c" }, // Grey
  { name: "Blood", icon: <Bloodtype fontSize="large" />, color: "#ff6b81" }, // Pink
  { name: "Repairs", icon: <Build fontSize="large" />, color: "#5352ed" }, // Indigo
  { name: "Pet Care", icon: <Pets fontSize="large" />, color: "#eccc68" }, // Yellow
];

const Categories = () => {
  return (
    <Box 
      sx={{ 
        py: 10, 
        background: 'linear-gradient(to right, #2c3e50, #4ca1af)', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        opacity: 0.1
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ fontWeight: 'bold', mb: 6, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
        >
          What do you need help with?
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {categories.map((cat, index) => (
            <Grid item key={index}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Paper
                  elevation={3}
                  sx={{
                    width: 140,
                    height: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(5px)',
                    color: 'white',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: cat.color,
                      borderColor: cat.color,
                      boxShadow: `0 0 20px ${cat.color}`
                    }
                  }}
                >
                  <Box sx={{ mb: 1 }}>{cat.icon}</Box>
                  <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
                    {cat.name}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;