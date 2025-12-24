import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Stack, Divider, Paper } from '@mui/material';

const Stats = () => {
  return (
    <Box sx={{ position: 'relative', zIndex: 10, mt: -6, px: 2 }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
            spacing={{ xs: 4, md: 0 }}
            justifyContent="space-around"
            alignItems="center"
          >
            <StatItem number="1,200+" label="Active Helpers" color="#667eea" />
            <StatItem number="5,400+" label="Lives Impacted" color="#764ba2" />
            <StatItem number="25+" label="Cities Covered" color="#ff6b6b" />
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
};

const StatItem = ({ number, label, color }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h3" sx={{ fontWeight: 800, color: color }}>
      {number}
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, mt: 1 }}>
      {label}
    </Typography>
  </Box>
);

export default Stats;