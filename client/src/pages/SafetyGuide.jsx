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
import './SafetyGuide.css';
import Footer from '../components/Footer';


const SafetyGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const emergencyContacts = [
    { title: 'Police', number: '100', icon: ErrorOutline, color: '#ef4444' },
    { title: 'Ambulance', number: '108', icon: Phone, color: '#3b82f6' },
    { title: 'Fire ', number: '101', icon: Warning, color: '#f59e0b' },
  ];

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
    <Box className="sg-root-container">
      {/* Hero Section */}
      <Box className="sg-hero-section">
        <Container maxWidth="lg">
          <Stack spacing={2} className="sg-hero-content">
            <Box className="sg-hero-icon-box">
              <Shield className="sg-hero-icon" />
            </Box>
            <Typography variant="h3" className="sg-hero-title">
              Community Safety Guide
            </Typography>
            <Typography variant="h6" className="sg-hero-subtitle">
              Stay safe while helping neighbors and building community connections
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Emergency Contacts */}
      <Box className="sg-emergency-section">
        <Container maxWidth="lg">
          <Typography variant="h4" className="sg-section-title">
            Emergency Contacts
          </Typography>
          <Grid container spacing={2} className="sg-emergency-grid">
            {emergencyContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="sg-emergency-card" sx={{ borderLeft: `4px solid ${contact.color}` }}>
                    <CardContent className="sg-emergency-card-content">
                      <Stack spacing={1} alignItems="center">
                        <Box className="sg-emergency-icon" sx={{ color: contact.color }}>
                          <IconComponent sx={{ fontSize: 32 }} />
                        </Box>
                        <Typography variant="subtitle2" className="sg-emergency-title">
                          {contact.title}
                        </Typography>
                        <Typography variant="h5" className="sg-emergency-number" sx={{ color: contact.color }}>
                          {contact.number}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Best Practices */}
      <Box className="sg-best-practices-section">
        <Container maxWidth="lg">
          <Typography variant="h4" className="sg-section-title">
            Safety Best Practices
          </Typography>
          <Grid container spacing={3} className="sg-practices-grid">
            {bestPractices.map((practice, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="sg-practice-card">
                  <CardContent className="sg-practice-card-content">
                    <Box className="sg-practice-icon" sx={{ color: practice.color }}>
                      {React.cloneElement(practice.icon, { sx: { fontSize: 28 } })}
                    </Box>
                    <Typography variant="h6" className="sg-practice-title">
                      {practice.title}
                    </Typography>
                    <Typography variant="body2" className="sg-practice-description">
                      {practice.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Detailed Guidelines */}
      <Box className="sg-guidelines-section">
        <Container maxWidth="lg">
          <Typography variant="h4" className="sg-section-title">
            Detailed Safety Guidelines
          </Typography>
          <Stack spacing={1} className="sg-accordion-container">
            {safetyTips.map((tip) => (
              <Accordion 
                key={tip.id}
                expanded={expanded === tip.id}
                onChange={handleAccordionChange(tip.id)}
                className="sg-safety-accordion"
              >
                <AccordionSummary expandIcon={<ExpandMore />} className="sg-accordion-summary">
                  <Box className="sg-accordion-icon">
                    {tip.icon}
                  </Box>
                  <Typography variant="h6" className="sg-accordion-title">
                    {tip.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="sg-accordion-details">
                  <List className="sg-tips-list">
                    {tip.content.map((item, index) => (
                      <ListItem key={index} className="sg-tip-item">
                        <ListItemIcon className="sg-tip-icon">
                          <CheckCircle sx={{ color: '#14b8a6' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{ className: 'sg-tip-text' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Quick Reference Card */}
      <Box className="sg-quick-reference-section">
        <Container maxWidth="lg">
          <Card className="sg-reference-card">
            <CardContent className="sg-reference-content">
              <Typography variant="h5" className="sg-reference-title">
                Quick Reference: When to Report
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} className="sg-reference-grid">
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ef4444' }}>
                      🚨 Report Immediately:
                    </Typography>
                    <List dense className="sg-report-list">
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ErrorOutline sx={{ fontSize: 18, color: '#ef4444' }} />
                        </ListItemIcon>
                        <ListItemText primary="Threats or harassment" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ErrorOutline sx={{ fontSize: 18, color: '#ef4444' }} />
                        </ListItemIcon>
                        <ListItemText primary="Suspicious financial requests" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ErrorOutline sx={{ fontSize: 18, color: '#ef4444' }} />
                        </ListItemIcon>
                        <ListItemText primary="Inappropriate behavior" />
                      </ListItem>
                    </List>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                      ⚠️ Use Caution With:
                    </Typography>
                    <List dense className="sg-report-list">
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Warning sx={{ fontSize: 18, color: '#f59e0b' }} />
                        </ListItemIcon>
                        <ListItemText primary="Unverified accounts" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Warning sx={{ fontSize: 18, color: '#f59e0b' }} />
                        </ListItemIcon>
                        <ListItemText primary="Urgent/emergency requests" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Warning sx={{ fontSize: 18, color: '#f59e0b' }} />
                        </ListItemIcon>
                        <ListItemText primary="Requests to leave platform" />
                      </ListItem>
                    </List>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Community Pledge */}
      <Box className="sg-pledge-section">
        <Container maxWidth="lg">
          <Card className="sg-pledge-card">
            <CardContent className="sg-pledge-content">
              <Typography variant="h5" className="sg-pledge-title">
                Our Community Pledge
              </Typography>
              <Typography variant="body1" className="sg-pledge-text">
                We are committed to building a safe, respectful, and inclusive community where neighbors 
                help neighbors. By following these safety guidelines, we create an environment of trust 
                and mutual support. Together, we can make our neighborhoods stronger and safer for everyone.
              </Typography>
              <Stack direction="row" spacing={2} className="sg-pledge-actions" sx={{ justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  className="sg-pledge-btn"
                  startIcon={<CheckCircle />}
                >
                  I Understand & Agree
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  className="sg-pledge-btn"
                >
                  Share This Guide
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer Note */}
      <Box className="sg-guide-footer">
        <Container maxWidth="lg">
          <Typography variant="caption" className="sg-footer-text">
            Last Updated: January 2026 | For urgent safety concerns, always contact local authorities
          </Typography>
        </Container>
      </Box>
      <Footer />

    </Box>
  );
};

export default SafetyGuide;
