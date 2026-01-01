import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Stack, Divider, Paper } from '@mui/material';

// CSS ফাইল ইমপোর্ট
import './Stats.css';

const Stats = () => {
  return (
    <Box className="stats-wrapper">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper elevation={0} className="stats-card">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, borderColor: 'rgba(0,0,0,0.06)' }} />}
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

// আইটেম কম্পোনেন্ট (Original Props & Logic)
const StatItem = ({ number, label, color }) => (
  <Box className="stat-item-box">
    <Typography variant="h3" className="stat-number" sx={{ color: color }}>
      {number}
    </Typography>
    <Typography variant="body1" className="stat-label">
      {label}
    </Typography>
  </Box>
);

export default Stats;