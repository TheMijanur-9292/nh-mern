import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, Avatar, Stack, 
  IconButton, Button, Grid, Divider 
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  ChatBubbleOutline, 
  Share, 
  AddCircleOutline,
  VolunteerActivism
} from '@mui/icons-material';
import Footer from '../components/Footer';
import './SuccessStories.css';

const SuccessStories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [stories, setStories] = useState([
    {
      id: 1,
      name: "Arif Ahmed",
      badge: "Super Neighbor 🏆",
      avatar: "A",
      time: "2 hours ago",
      story: "Last night, my child urgently needed a special medicine. I was searching everywhere but couldn't find it. I posted a request on this app and within 10 minutes, my neighbor Sumi from the next block brought the medicine to my door. Forever grateful for this wonderful community!"
    },
    {
      id: 2,
      name: "Sumaiya Akhter",
      badge: "Helpful Neighbor ✨",
      avatar: "S",
      time: "1 day ago",
      story: "I needed help planting trees in my garden. Robin spent the whole evening helping me with the work. I found such a wonderful neighbor through this platform. Having neighbors like this is truly a blessing!"
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      badge: "Community Helper 💪",
      avatar: "M",
      time: "3 days ago",
      story: "My elderly mother needed someone to help with grocery shopping while I was at work. The community responded amazingly. Mrs. Fatima helped her with everything. This app has restored my faith in the power of neighborhoods!"
    },
    {
      id: 4,
      name: "Ruma Dey",
      badge: "Kind Soul 🌟",
      avatar: "R",
      time: "5 days ago",
      story: "Our internet went down during an important online meeting. I urgently needed a stable connection. Within minutes, my neighbor allowed me to use his home. Such small acts of kindness make a huge difference!"
    },
    {
      id: 5,
      name: "Karim Khan",
      badge: "Reliable Partner 🤝",
      avatar: "K",
      time: "1 week ago",
      story: "I needed to move to a new apartment and was worried about finding help. The community came together with vehicles and helping hands. We completed the entire move in just one day. Neighbors like these are priceless!"
    },
    {
      id: 6,
      name: "Priya Sharma",
      badge: "Super Neighbor 🏆",
      avatar: "P",
      time: "1 week ago",
      story: "My son's bicycle got punctured before his school sports day. I posted about it and received 3 offers immediately. Raj fixed it perfectly within an hour. This community spirit is what we need more of!"
    },
    {
      id: 7,
      name: "Jamal Islam",
      badge: "Helpful Neighbor ✨",
      avatar: "J",
      time: "10 days ago",
      story: "I was learning programming and got stuck on a complex problem. A neighbor who's a software developer helped me understand the concept. Got an A+ in my exam! Grateful for neighbors who generously share their expertise."
    },
    {
      id: 8,
      name: "Neha Banerjee",
      badge: "Community Helper 💪",
      avatar: "N",
      time: "2 weeks ago",
      story: "My cooking gas ran out on a holiday when all shops were closed. A neighbor immediately lent me a cylinder until mine was refilled. It's these small gestures that make you realize how caring people can be!"
    },
    {
      id: 9,
      name: "Rajesh Patel",
      badge: "Kind Soul 🌟",
      avatar: "R",
      time: "2 weeks ago",
      story: "My daughter was frightened before her dance performance. My neighbor Aisha, who's a professional dancer, spent 30 minutes coaching her with confidence-building tips. My daughter did amazing! Thank you!"
    },
    {
      id: 10,
      name: "Laila Khan",
      badge: "Super Neighbor 🏆",
      avatar: "L",
      time: "2 weeks ago",
      story: "I had an unexpected guest arriving and my kitchen needed repairs. Three neighbors came together and everything was fixed perfectly before my guest arrived. The power of community is truly magical!"
    },
    {
      id: 11,
      name: "Vikram Singh",
      badge: "Reliable Partner 🤝",
      avatar: "V",
      time: "3 weeks ago",
      story: "Lost my job and feeling depressed. The community not only supported me emotionally but also shared job leads. I found a better position thanks to their encouragement and network. Blessed to live here!"
    },
    {
      id: 12,
      name: "Amina Hassan",
      badge: "Helpful Neighbor ✨",
      avatar: "A",
      time: "3 weeks ago",
      story: "Needed emergency babysitting when my kid got fever and I had to rush to hospital. My neighbors took care of my other two children without hesitation. Such trust and responsibility in the community!"
    },
    {
      id: 13,
      name: "Rohan Desai",
      badge: "Community Helper 💪",
      avatar: "R",
      time: "1 month ago",
      story: "My electrical wiring was causing problems and I couldn't afford expensive electricians. A neighbor who's an electrician fixed everything for just the cost of materials. Genuine kindness exists!"
    },
    {
      id: 14,
      name: "Zahra Ali",
      badge: "Kind Soul 🌟",
      avatar: "Z",
      time: "1 month ago",
      story: "Pregnant and couldn't carry groceries. Neighbors rotated helping me every week with shopping and household chores. Made my pregnancy so much easier. Now I'm helping other expectant mothers in the community!"
    },
    {
      id: 15,
      name: "Arjun Nair",
      badge: "Super Neighbor 🏆",
      avatar: "A",
      time: "1 month ago",
      story: "My car broke down in the middle of nowhere. A neighbor happened to pass by and gave me a ride to the mechanic. Later, he even drove me back to pick it up. Such helpful people exist!"
    },
    {
      id: 16,
      name: "Sophia Malik",
      badge: "Helpful Neighbor ✨",
      avatar: "S",
      time: "1 month ago",
      story: "Looking for a pet sitter for my dog while I traveled. Found the perfect neighbor who loves animals. My dog was happier with them than with me! Best decision ever!"
    },
    {
      id: 17,
      name: "Aditya Roy",
      badge: "Community Helper 💪",
      avatar: "A",
      time: "1 month ago",
      story: "Wanted to learn cooking Indian cuisine. A neighbor who's a chef invited me for cooking sessions. Now I make restaurant-quality dishes at home. Learning in a friendly environment is the best!"
    },
    {
      id: 18,
      name: "Fatima Ahmed",
      badge: "Kind Soul 🌟",
      avatar: "F",
      time: "6 weeks ago",
      story: "My son is autistic and the community has been incredibly supportive. They included him in neighborhood activities and he's made beautiful friendships. This inclusion means the world to us!"
    },
    {
      id: 19,
      name: "Deepak Verma",
      badge: "Reliable Partner 🤝",
      avatar: "D",
      time: "6 weeks ago",
      story: "Starting a small business and needed advice. A successful entrepreneur neighbor mentored me for free. His guidance helped me avoid costly mistakes. Now I'm helping new entrepreneurs too!"
    },
    {
      id: 20,
      name: "Isabella Costa",
      badge: "Super Neighbor 🏆",
      avatar: "I",
      time: "6 weeks ago",
      story: "New to the country, feeling lonely and lost. The community welcomed me warmly, helped me understand local customs, and now I feel like I truly belong. Home is where neighbors care!"
    },
    {
      id: 21,
      name: "Nitin Gupta",
      badge: "Helpful Neighbor ✨",
      avatar: "N",
      time: "2 months ago",
      story: "My kids needed after-school care. Instead of expensive daycare, neighbors created a community care circle. Safe, affordable, and the kids learned so much. Brilliant community solution!"
    },
    {
      id: 22,
      name: "Yasmin Khan",
      badge: "Community Helper 💪",
      avatar: "Y",
      time: "2 months ago",
      story: "Started a fitness group with neighbors. We exercise together, motivate each other, and have become best friends. Lost weight and gained a family. Win-win!"
    },
    {
      id: 23,
      name: "Lucas Santos",
      badge: "Kind Soul 🌟",
      avatar: "L",
      time: "2 months ago",
      story: "My wife had major surgery and couldn't do much. Neighbors brought prepared meals for 2 weeks without me asking. Also helped with household tasks. This community is amazing!"
    },
    {
      id: 24,
      name: "Shreya Nair",
      badge: "Super Neighbor 🏆",
      avatar: "S",
      time: "2 months ago",
      story: "Wanted to learn painting but art classes were expensive. A retired artist neighbor offered free lessons from her studio. Now I have a beautiful hobby and a dear friend!"
    },
    {
      id: 25,
      name: "Ahmed Ibrahim",
      badge: "Reliable Partner 🤝",
      avatar: "A",
      time: "2 months ago",
      story: "My old car needed repairs. A neighbor who's a mechanic helped me fix it myself, teaching me valuable skills. Saved money and learned something new. Perfect exchange!"
    },
    {
      id: 26,
      name: "Olivia Martinez",
      badge: "Helpful Neighbor ✨",
      avatar: "O",
      time: "3 months ago",
      story: "Going through a rough divorce, neighbors provided emotional support and companionship. They checked on me regularly and helped me rediscover joy. Grateful for their friendship!"
    },
    {
      id: 27,
      name: "Sanjay Kumar",
      badge: "Community Helper 💪",
      avatar: "S",
      time: "3 months ago",
      story: "Elderly neighbor's WiFi wasn't working. Spent an afternoon setting it up and teaching her to use video calls. Now she talks to her grandchildren in Europe regularly. Technology is beautiful!"
    },
    {
      id: 28,
      name: "Elena Rossi",
      badge: "Kind Soul 🌟",
      avatar: "E",
      time: "3 months ago",
      story: "Had severe anxiety before my wedding. Neighbors threw a surprise bachelorette party and calmed my nerves. Their love and support made me feel so confident. Best neighbors ever!"
    },
    {
      id: 29,
      name: "Rahul Pandey",
      badge: "Super Neighbor 🏆",
      avatar: "R",
      time: "3 months ago",
      story: "Lockdown was tough but neighbors coordinated virtual classes for kids, shared produce from gardens, and checked on elderly residents. Community resilience at its finest!"
    },
    {
      id: 30,
      name: "Grace Williams",
      badge: "Reliable Partner 🤝",
      avatar: "G",
      time: "3 months ago",
      story: "Lost my wallet with all important documents. Neighbors helped me search and eventually found it. They also accompanied me to get replacements. Real help from real people!"
    }
  ]);

  const handleLike = (id) => {
    setStories(stories.map(s => 
      s.id === id ? { ...s, likes: s.liked ? s.likes - 1 : s.likes + 1, liked: !s.liked } : s
    ));
  };

  return (
    <>
      <Box className="ss-root-container">
        <Container maxWidth="md">
          
          {/* Header Section */}
          <Box className="ss-header-section">
            <Box className="ss-header-icon-wrapper">
              <VolunteerActivism className="ss-header-icon" />
            </Box>
            <Typography variant="h2" className="ss-header-title">
              Success <span className="ss-title-highlight">Stories</span>
            </Typography>
            <Typography className="ss-header-subtitle">
              Real stories from real neighbors. See how our community stands together and supports each other.
            </Typography>
            
            <Button 
              variant="contained" 
              startIcon={<AddCircleOutline />}
              className="ss-share-button"
            >
              Share Your Story
            </Button>
          </Box>

          {/* Stories Feed */}
          <Stack className="ss-stories-feed">
            {stories.map((story, index) => (
              <Paper key={story.id} className="ss-story-card">
                  {/* User Info Header */}
                  <Box className="ss-story-header">
                    <Box className="ss-user-info">
                      <Avatar className="ss-avatar">{story.avatar}</Avatar>
                      <Box className="ss-user-details">
                        <Typography className="ss-user-name">{story.name}</Typography>
                        <Box className="ss-meta-row">
                          <Typography className="ss-user-time">{story.time}</Typography>
                          <span className="ss-user-badge">{story.badge}</span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Typography className="ss-story-text">
                    "{story.story}"
                  </Typography>

                  <Box className="ss-divider" />

                  {/* Actions */}
                  <Box className="ss-actions-bar">
                    <Box 
                      className="ss-action-item"
                      onClick={() => handleLike(story.id)}
                    >
                      <IconButton 
                        size="small" 
                        color={story.liked ? "error" : "default"}
                        className="ss-action-btn"
                      >
                        {story.liked ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                      <Typography className="ss-action-label">{story.likes}</Typography>
                    </Box>
                    <Box className="ss-action-item">
                      <IconButton size="small" className="ss-action-btn">
                        <ChatBubbleOutline fontSize="small" />
                      </IconButton>
                      <Typography className="ss-action-label">Comment</Typography>
                    </Box>
                    <IconButton size="small" className="ss-share-icon">
                      <Share fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
          </Stack>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box className="ss-footer-section">
        <Footer />
      </Box>
    </>
  );
};

export default SuccessStories;
