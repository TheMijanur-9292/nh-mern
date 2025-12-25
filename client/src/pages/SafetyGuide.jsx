import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack, Divider, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  HealthAndSafety, 
  Warning, 
  Sos, 
  LocalPhone, 
  ExpandMore, 
  Shield, 
  Handshake, 
  Support 
} from '@mui/icons-material';

const SafetyGuide = () => {
  const steps = [
    {
      title: "Verifying Requests",
      icon: <Shield sx={{ fontSize: 40, color: '#764ba2' }} />,
      desc: "সাহায্য করার আগে ইউজারের প্রোফাইল এবং রেটিং চেক করুন। সন্দেহজনক মনে হলে পাবলিক প্লেসে দেখা করার চেষ্টা করুন।"
    },
    {
      title: "Public Meetings",
      icon: <Handshake sx={{ fontSize: 40, color: '#764ba2' }} />,
      desc: "জিনিসপত্র আদান-প্রদান করার সময় দিনের বেলা এবং জনাকীর্ণ স্থান বেছে নিন। একা যাওয়ার চেয়ে কাউকে সাথে রাখা নিরাপদ।"
    },
    {
      title: "SOS Awareness",
      icon: <Sos sx={{ fontSize: 40, color: '#ff4757' }} />,
      desc: "জরুরি বিপদে আমাদের SOS বাটন ব্যবহার করুন। এতে আপনার আশেপাশের সবার কাছে দ্রুত অ্যালার্ট পৌঁছে যাবে।"
    }
  ];

  const emergencyNumbers = [
    { label: "জাতীয় জরুরি সেবা", number: "999", color: "#ff4757" },
    { label: "অ্যাম্বুলেন্স সার্ভিস", number: "10655", color: "#2ed573" },
    { label: "ফায়ার সার্ভিস", number: "02-9555555", color: "#ffa502" }
  ];

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 8 }}>
      
      {/* ১. Hero Section */}
      <Box sx={{ 
        bgcolor: '#1a1a2e', 
        color: '#fff', 
        py: { xs: 8, md: 10 }, 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #1a1a2e 0%, #16213e 100%)'
      }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <HealthAndSafety sx={{ fontSize: 60, color: '#ff4757', mb: 2 }} />
            <Typography variant="h3" fontWeight="900" gutterBottom>
              Safety <span style={{ color: '#ff4757' }}>First</span>
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
              NeighborHelp কমিউনিটিতে আপনার নিরাপত্তাই আমাদের কাছে সবচেয়ে গুরুত্বপূর্ণ। 
              একটি নিরাপদ পরিবেশ তৈরি করতে নিচের গাইডলাইনগুলো অনুসরণ করুন।
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -5 }}>
        {/* ২. Quick Tips Section */}
        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
                <Paper elevation={10} sx={{ p: 4, borderRadius: '24px', textAlign: 'center', height: '100%', border: '1px solid #eee' }}>
                  <Box sx={{ mb: 2 }}>{step.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{step.desc}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* ৩. SOS Instructions */}
        <Box sx={{ mt: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="900" gutterBottom>How to use <span style={{ color: '#ff4757' }}>SOS</span>?</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                বিপদে পড়লে ম্যাপের ওপর থাকা লাল SOS বাটনটি ৩ সেকেন্ড চেপে ধরুন। এটি আপনার ৫ কিমি ব্যাসার্ধের সব ইউজারের কাছে একটি সাউন্ড নোটিফিকেশন পাঠাবে। 
                আপনার সঠিক লোকেশনটি তখন সবার ম্যাপে হাইলাইট হবে।
              </Typography>
              <Stack spacing={2}>
                <Accordion sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: '12px !important' }}>
                  <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight="bold">ভুল করে SOS চাপলে কী করব?</Typography></AccordionSummary>
                  <AccordionDetails><Typography variant="body2" color="text.secondary">সাথে সাথে 'Cancel SOS' বাটনে ক্লিক করুন এবং চ্যাট বক্সে ভুল হয়েছে বলে জানান।</Typography></AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: '12px !important' }}>
                  <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight="bold">SOS বাটন কি সবসময় কাজ করবে?</Typography></AccordionSummary>
                  <AccordionDetails><Typography variant="body2" color="text.secondary">হ্যাঁ, যতক্ষণ আপনার ফোনের জিপিএস অন থাকবে ততক্ষণ এটি কাজ করবে।</Typography></AccordionDetails>
                </Accordion>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: '#fff0f0', p: 4, borderRadius: '30px', border: '2px dashed #ff4757', textAlign: 'center' }}>
                <Warning sx={{ fontSize: 80, color: '#ff4757', mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" color="#1a1a2e" gutterBottom>জরুরি হেল্পলাইন নম্বরসমূহ</Typography>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  {emergencyNumbers.map((item, i) => (
                    <Paper key={i} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px' }}>
                      <Typography fontWeight="bold">{item.label}</Typography>
                      <Button variant="contained" startIcon={<LocalPhone />} sx={{ bgcolor: item.color, borderRadius: '20px' }}>
                        {item.number}
                      </Button>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ৪. Final Note */}
        <Box sx={{ mt: 10, p: 5, bgcolor: '#f3f0ff', borderRadius: '30px', textAlign: 'center' }}>
          <Support sx={{ fontSize: 40, color: '#764ba2', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold">We are here for you!</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
            আপনার কোনো অপ্রীতিকর অভিজ্ঞতা হলে আমাদের সাপোর্ট সেন্টারে রিপোর্ট করুন। আমরা ২৪ ঘণ্টার মধ্যে অ্যাকশন নিয়ে থাকি।
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default SafetyGuide;