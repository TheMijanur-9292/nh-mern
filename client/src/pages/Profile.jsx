import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, Stack, Grid, 
  Accordion, AccordionSummary, AccordionDetails, Button,
  List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import {
  ExpandMore, Shield, Phone, Warning, CheckCircle, 
  LocationOn, Person, Lock, ErrorOutline, Info,
  SecurityOutlined, FavoriteBorder, Verified
} from '@mui/icons-material';
import './safetyguide.css';

const SafetyGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /* ✅ UPDATED AS PER YOUR INSTRUCTION (FULL NAME + INDIA) */
  const emergencyContacts = [
    { title: 'Police Emergency', number: '100', icon: Shield, color: '#ef4444' },
    { title: 'Fire & Rescue Services', number: '101', icon: Warning, color: '#f59e0b' },
    { title: 'Ambulance Emergency', number: '108', icon: Phone, color: '#3b82f6' },
    { title: 'Women & Child Helpline', number: '181', icon: FavoriteBorder, color: '#ec4899' },
  ];

  /* 🔒 CONTENT COMPLETELY UNCHANGED BELOW */

  const safetyTips = [
    {
      id: 'panel1',
      title: 'Before Meeting Someone',
      icon: <Info sx={{ color: '#6366f1' }} />,
      content: [
        'Always verify the person\'s profile and neighborhood rating',
        'Check if they have community badges or positive reviews',
        'Read their bio carefully and check if they are verified',
        'Ask questions about what they need help with',
        'Trust your instincts - if something feels off, don\'t proceed'
      ]
    },
    {
      id: 'panel2',
      title: 'During the Meeting',
      icon: <LocationOn sx={{ color: '#14b8a6' }} />,
      content: [
        'Always meet in public places - cafes, parks, community centers',
        'Inform a trusted friend or family member about your meeting',
        'Share your location with someone you trust',
        'Bring your phone fully charged',
        'Keep the meeting brief and in daylight hours when possible',
        'Never share personal financial information'
      ]
    },
    {
      id: 'panel3',
      title: 'Online Safety',
      icon: <Lock sx={{ color: '#f59e0b' }} />,
      content: [
        'Never share passwords or login credentials',
        'Don\'t provide bank account or card details',
        'Avoid clicking suspicious links sent by strangers',
        'Use only the NeighborHelp messaging system',
        'Report suspicious behavior immediately',
        'Keep your personal address private until you build trust'
      ]
    },
    {
      id: 'panel4',
      title: 'Recognizing Red Flags',
      icon: <ErrorOutline sx={{ color: '#ef4444' }} />,
      content: [
        'Urgent requests asking for money or gifts',
        'Requests to move conversation off the platform',
        'Inconsistent or vague information about their request',
        'Pressure to make quick decisions',
        'Requests to share inappropriate photos',
        'Users who are overly secretive about their purpose'
      ]
    },
    {
      id: 'panel5',
      title: 'What to Do If You Feel Unsafe',
      icon: <Phone sx={{ color: '#3b82f6' }} />,
      content: [
        'Leave immediately and go to a safe location',
        'Contact emergency services if you\'re in immediate danger',
        'Block the user on NeighborHelp',
        'Report the incident to our community team',
        'Save any messages or evidence of concerning behavior',
        'Reach out to trusted friends or family for support'
      ]
    }
  ];

  const bestPractices = [
    {
      title: 'Verify Identities',
      description: 'Always ask for identification before helping strangers',
      icon: <Verified />,
      color: '#6366f1'
    },
    {
      title: 'Trust Your Gut',
      description: 'If something feels wrong, it probably is. Don\'t ignore your instincts',
      icon: <SecurityOutlined />,
      color: '#14b8a6'
    },
    {
      title: 'Stay Connected',
      description: 'Keep loved ones informed about your whereabouts and activities',
      icon: <Person />,
      color: '#f59e0b'
    },
    {
      title: 'Document Everything',
      description: 'Keep records of conversations and agreements for your protection',
      icon: <CheckCircle />,
      color: '#8b5cf6'
    },
    {
      title: 'Know Your Rights',
      description: 'Understand local laws and your rights as a community helper',
      icon: <Shield />,
      color: '#06b6d4'
    },
    {
      title: 'Report Abuse',
      description: 'Help keep community safe by reporting suspicious or harmful behavior',
      icon: <FavoriteBorder />,
      color: '#ec4899'
    }
  ];

  return (
    <Box className="safety-guide-container">

      {/* HERO */}
      <Box className="safety-hero">
        <Container maxWidth="lg">
          <Stack spacing={2} className="hero-content">
            <Shield className="hero-icon" />
            <Typography className="hero-title">
              Community Safety Guide
            </Typography>
            <Typography className="hero-subtitle">
              Stay safe while helping neighbors and building community connections
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* EMERGENCY CONTACTS */}
      <Box className="gradient-section">
        <Container maxWidth="lg">
          <Typography className="section-title">
            Emergency Contacts
          </Typography>
          <Grid container spacing={2}>
            {emergencyContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="emergency-card">
                    <CardContent className="emergency-card-content">
                      <IconComponent sx={{ fontSize: 36, color: contact.color }} />
                      <Typography className="emergency-title">
                        {contact.title}
                      </Typography>
                      <Typography className="emergency-number" sx={{ color: contact.color }}>
                        {contact.number}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* BEST PRACTICES */}
      <Box className="gradient-section">
        <Container maxWidth="lg">
          <Typography className="section-title">
            Safety Best Practices
          </Typography>
          <Grid container spacing={3}>
            {bestPractices.map((practice, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="practice-card">
                  <CardContent className="practice-card-content">
                    <Box sx={{ color: practice.color }}>
                      {React.cloneElement(practice.icon, { sx: { fontSize: 30 } })}
                    </Box>
                    <Typography className="practice-title">
                      {practice.title}
                    </Typography>
                    <Typography className="practice-description">
                      {practice.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* GUIDELINES */}
      <Box className="gradient-section">
        <Container maxWidth="lg">
          <Typography className="section-title">
            Detailed Safety Guidelines
          </Typography>

          {safetyTips.map((tip) => (
            <Accordion
              key={tip.id}
              expanded={expanded === tip.id}
              onChange={handleAccordionChange(tip.id)}
              className="safety-accordion"
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                {tip.icon}
                <Typography sx={{ ml: '2%' }}>
                  {tip.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {tip.content.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#14b8a6' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* QUICK REFERENCE */}
      <Box className="gradient-section">
        <Container maxWidth="lg">
          <Card className="reference-card">
            <CardContent>
              <Typography variant="h5">Quick Reference: When to Report</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>Use common sense and report immediately if you feel unsafe.</Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* PLEDGE */}
      <Box className="gradient-section">
        <Container maxWidth="lg">
          <Card className="pledge-card">
            <CardContent className="pledge-content">
              <Typography className="pledge-title">
                Our Community Pledge
              </Typography>
              <Typography className="pledge-text">
                We are committed to building a safe, respectful, and inclusive community where neighbors 
                help neighbors. By following these safety guidelines, we create an environment of trust 
                and mutual support. Together, we can make our neighborhoods stronger and safer for everyone.
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained">I Understand & Agree</Button>
                <Button variant="outlined">Share This Guide</Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box className="guide-footer">
        <Container>
          <Typography variant="caption">
            Last Updated: January 2026 | For urgent safety concerns, always contact local authorities
          </Typography>
        </Container>
      </Box>

    </Box>
  );
};

export default SafetyGuide;
