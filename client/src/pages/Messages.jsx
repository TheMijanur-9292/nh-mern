import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, Grid, Paper, Typography, List, ListItemAvatar, 
  Avatar, ListItemText, TextField, IconButton, Stack, Badge, ListItemButton, Divider,
  Dialog, DialogTitle, DialogContent, Button, Rating, CircularProgress, Chip, Snackbar, Alert,
  InputAdornment, Drawer, useMediaQuery, useTheme
} from '@mui/material';
import { 
  Send, Chat as ChatIcon, ArrowBack, 
  VerifiedUser, Security, PrivacyTip, InfoOutlined, AccountCircle, WorkspacePremium,
  Close as CloseIcon, Lock, LocationOn, Flag, Star
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { io } from "socket.io-client";
import './Messages.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Messages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { userId: receiverIdFromUrl } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const queryParams = new URLSearchParams(location.search);
  const receiverNameFromUrl = queryParams.get('name');

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  // ইউজার লোড করা (localStorage থেকে)
  const [currentUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser ? { ...savedUser, id: savedUser.id || savedUser._id } : null;
  });

  const [activeChat, setActiveChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  // --- স্টেট ---
  const [openRating, setOpenRating] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openGuidelines, setOpenGuidelines] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [profileLoading, setProfileLoading] = useState(false);
  const [otherUserData, setOtherUserData] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Socket.io কানেকশন
  useEffect(() => {
   // socket.current = io("http://localhost:5000");
   socket.current = io(API_BASE_URL); 
   if (currentUser?.id) socket.current.emit("addNewUser", currentUser.id);
    
    socket.current.on("getOnlineUsers", (users) => setOnlineUsers(users));
    
    socket.current.on("getMessage", (data) => {
      // যদি বর্তমান চ্যাট উইন্ডো খোলা থাকে, তাহলে মেসেজ আপডেট হবে
      if (activeChat?.id === data.senderId) {
        setMessages((prev) => [...prev, data]);
      }
      // ইনবক্স লিস্ট রিফ্রেশ হবে
      fetchConversations(); 
    });

    return () => socket.current.disconnect();
  }, [currentUser, activeChat]);

  // কথোপকথন ফেচ করা
  const fetchConversations = async () => {
    const uid = currentUser?.id || currentUser?._id;
    if (!uid) return;
    try {
     //  const res = await axios.get(`http://localhost:5000/api/messages/conversations/${uid}`);
     const res = await axios.get(`${API_BASE_URL}/api/messages/conversations/${uid}`); 
     setConversations(res.data);
      
      // যদি URL এ কোনো ID না থাকে কিন্তু কনভারসেশন থাকে, প্রথমটা লোড করুন
      if (!receiverIdFromUrl && res.data.length > 0 && !isMobile) {
        const latest = res.data[0];
        navigate(`/messages/${latest._id}?name=${encodeURIComponent(latest.userInfo?.name)}`, { replace: true });
      }
    } catch (err) { console.error("Inbox load failed:", err); }
  };

  useEffect(() => { if (currentUser?.id) fetchConversations(); }, [receiverIdFromUrl, currentUser]);

  // অ্যাক্টিভ চ্যাট সেট করা
  useEffect(() => {
    if (receiverIdFromUrl && receiverIdFromUrl !== "undefined" && currentUser?.id) {
      setActiveChat({ id: receiverIdFromUrl, name: receiverNameFromUrl || 'Neighbor' });
      fetchChatHistory(receiverIdFromUrl);
      if (isMobile) setSidebarOpen(false); 
    } else {
        // --- পরিবর্তন: মোবাইলে চ্যাট সিলেক্ট করা না থাকলে ড্রয়ার খুলে যাবে ---
        if(!isMobile) {
          setSidebarOpen(true);
        } else {
          setActiveChat(null); // চ্যাট ক্লিয়ার রাখা
          setSidebarOpen(true); // ড্রয়ার খুলে রাখা
        }
    }
  }, [receiverIdFromUrl, currentUser, isMobile]);

  const fetchChatHistory = async (otherId) => {
    try {
     // const res = await axios.get(`http://localhost:5000/api/messages/${currentUser.id}/${otherId}`);
     const res = await axios.get(`${API_BASE_URL}/api/messages/${currentUser.id}/${otherId}`); 
     setMessages(res.data);
    } catch (err) { console.error("History error:", err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat?.id) return;
    
    const messageData = { 
        senderId: currentUser.id, 
        receiverId: activeChat.id, 
        message: newMessage.trim() 
    };

    try {
     // const res = await axios.post('http://localhost:5000/api/messages/send', messageData);
      const res = await axios.post(`${API_BASE_URL}/api/messages/send`, messageData);
      // সকেটে পাঠানো
      socket.current.emit("sendMessage", res.data);
      
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
      fetchConversations();
    } catch (err) { console.error("Send error:", err); }
  };

  const fetchOtherUserProfile = async () => {
    setProfileLoading(true);
    setOpenProfile(true);
    try {
     // const res = await axios.get(`http://localhost:5000/api/users/${activeChat.id}`);
     const res = await axios.get(`${API_BASE_URL}/api/users/${activeChat.id}`); 
     setOtherUserData(res.data);
    } catch (err) {
      console.error("Profile load failed", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSendRating = async (newValue) => {
    if (!newValue) return;
    try {
      await axios.post(`${API_BASE_URL}/api/users/rate`, {
        userId: activeChat.id,
        star: newValue,
        currentUserId: currentUser.id
      });
      
      setToast({ open: true, message: 'Rating submitted successfully!', severity: 'success' });
      setOpenRating(false);
      if(openProfile) fetchOtherUserProfile();
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to update rating.";
      setToast({ open: true, message: errMsg, severity: 'warning' });
      setOpenRating(false);
    }
  };

  // অটো স্ক্রল নিচে
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const isOnline = (id) => onlineUsers.some(u => u.userId === id);

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box className="messages-container">
      
      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <Drawer 
        anchor="left" 
        open={sidebarOpen && isMobile} 
        onClose={() => setSidebarOpen(false)}
        className="sidebar-drawer"
        PaperProps={{ sx: { width: '80%' } }}
      >
        <ConversationsList 
          conversations={conversations}
          activeChat={activeChat}
          isOnline={isOnline}
          onSelect={(convo) => {
            navigate(`/messages/${convo._id}?name=${convo.userInfo?.name}`);
            setSidebarOpen(false);
          }}
        />
      </Drawer>

      <Grid container className="messages-grid">
        
        {/* --- CONVERSATIONS SIDEBAR (Desktop) --- */}
        {!isMobile && (
             <Grid item className="conversations-sidebar">
             <ConversationsList 
               conversations={conversations}
               activeChat={activeChat}
               isOnline={isOnline}
               onSelect={(convo) => navigate(`/messages/${convo._id}?name=${convo.userInfo?.name}`)}
             />
           </Grid>
        )}
       

        {/* --- CHAT WINDOW --- */}
        {/* <Grid item className={`chat-window ${!activeChat && isMobile ? 'hidden' : ''}`}> */}
        <Grid item className={`chat-window ${!activeChat && isMobile ? 'mobile-empty' : ''}`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <Paper elevation={1} className="chat-header">
                <Box className="chat-header-left">
                  {isMobile && (
                    <IconButton onClick={() => {setSidebarOpen(true); navigate('/messages');}} sx={{ mr: 1 }}>
                      <ArrowBack />
                    </IconButton>
                  )}
                  
                  <Box className="avatar-container" onClick={fetchOtherUserProfile}>
                    <Badge 
                        overlap="circular" 
                        variant="dot" 
                        color={isOnline(activeChat.id) ? "success" : "default"}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                      <Avatar className="chat-avatar" src={activeChat.avatar || ''}>
                        {activeChat.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                  </Box>

                  <Box className="chat-header-info" onClick={fetchOtherUserProfile}>
                    <Typography className="chat-header-name">
                      {activeChat.name}
                    </Typography>
                    <Typography className={`chat-header-status ${isOnline(activeChat.id) ? 'online' : ''}`}>
                      {isOnline(activeChat.id) ? "Active now" : "Offline"}
                    </Typography>
                  </Box>
                </Box>
                
                <Stack direction="row" spacing={1}>
                    {!isMobile && (
                         <Button 
                         variant="outlined" 
                         size="small" 
                         startIcon={<AccountCircle />} 
                         onClick={fetchOtherUserProfile}
                         className="profile-header-btn"
                       >
                         View Profile
                       </Button>
                    )}
                    <IconButton onClick={() => setOpenGuidelines(true)} color="primary">
                        <InfoOutlined />
                    </IconButton>
                </Stack>
              </Paper>

              {/* Messages Area */}
              <Box className="messages-area">
                {messages.length === 0 ? (
                  <Box className="messages-empty">
                    <ChatIcon sx={{ fontSize: 60, color: '#e0e0e0', mb: 2 }} />
                    <Typography color="text.secondary">
                      No messages yet. Say hello! 👋
                    </Typography>
                  </Box>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`message-wrapper ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}
                    >
                      <Box className="message-bubble">
                        <Typography variant="body1" className="message-text">
                          {msg.message}
                        </Typography>
                        <Typography className="message-time">
                          {formatMessageTime(msg.createdAt)}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))
                )}
                <div ref={scrollRef} />
              </Box>

              {/* Message Input */}
              <Box component="form" onSubmit={handleSendMessage} className="message-input-form">
                <TextField 
                  fullWidth 
                  placeholder="Type a message..." 
                  variant="outlined"
                  size="small" 
                  autoComplete='off' 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="message-input-field"
                  InputProps={{
                    className: 'rounded-input'
                  }}
                />
                <IconButton 
                  type="submit" 
                  disabled={!newMessage.trim()} 
                  className="send-btn"
                  color="primary"
                >
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box className="no-chat-selected">
               {!isMobile && (
                   <>
                    <img src="https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1698.jpg" alt="Chat" width="300" />
                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 600, color: '#374151' }}>
                        Select a conversation
                    </Typography>
                    <Typography color="text.secondary">
                        Choose a neighbor from the sidebar to start chatting.
                    </Typography>
                   </>
               )}
            </Box>
          )}
        </Grid>

        {/* --- GUIDELINES SIDEBAR (Desktop Only) --- */}
        {!isMobile && activeChat && (
             <Grid item className="guidelines-sidebar">
             <GuidelinesContent />
           </Grid>
        )}
       

        {/* Guidelines Drawer for Mobile */}
        <Drawer 
          anchor="bottom" 
          open={openGuidelines} 
          onClose={() => setOpenGuidelines(false)}
          className="guidelines-drawer-mobile"
          PaperProps={{ sx: { borderTopLeftRadius: 20, borderTopRightRadius: 20 } }}
        >
           <Box sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                 <Typography variant="h6" fontWeight="bold">Safety Guidelines</Typography>
                 <IconButton onClick={() => setOpenGuidelines(false)}><CloseIcon /></IconButton>
            </Box>
            <GuidelinesContent />
           </Box>
        </Drawer>
      </Grid>

      {/* --- DIALOGS --- */}
      
      {/* Profile Dialog */}
      <Dialog open={openProfile} onClose={() => setOpenProfile(false)} fullWidth maxWidth="xs">
        <DialogContent className="profile-dialog-content">
          {profileLoading ? (
            <Box textAlign="center" py={5}><CircularProgress /></Box>
          ) : otherUserData && (
            <Box textAlign="center" py={2}>
              <Avatar src={otherUserData.avatar} sx={{ width: 80, height: 80, margin: '0 auto', mb: 2, bgcolor: 'primary.main', fontSize: 32 }}>
                {otherUserData.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" fontWeight="bold">{otherUserData.name}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>{otherUserData.email}</Typography>
              
              <Chip 
                icon={<WorkspacePremium />} 
                label={otherUserData.badge || "Community Member"} 
                color="primary" 
                variant="outlined" 
                size="small" 
                sx={{ mb: 3 }}
              />

              <Paper elevation={0} sx={{ bgcolor: '#f9fafb', p: 2, borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>COMMUNITY RATING</Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Typography variant="h3" fontWeight="bold" color="primary.main">
                        {otherUserData.averageRating?.toFixed(1) || "0.0"}
                    </Typography>
                    <Star sx={{ color: '#faaf00', fontSize: 30 }} />
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    Based on {otherUserData.totalRatings || 0} reviews
                </Typography>
              </Paper>

              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => { setOpenProfile(false); setOpenRating(true); }}
                sx={{ borderRadius: 2, textTransform: 'none', fontSize: 16 }}
              >
                Rate this Neighbor
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={openRating} onClose={() => setOpenRating(false)}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Rate Experience</DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3, minWidth: 300 }}>
            <Typography variant="body2" color="text.secondary" mb={3}>
                How was your interaction with <b>{activeChat?.name}</b>?
            </Typography>
            <Rating 
                size="large" 
                value={starValue} 
                onChange={(event, newValue) => {
                    setStarValue(newValue);
                    handleSendRating(newValue);
                }} 
            />
        </DialogContent>
      </Dialog>

      {/* Toast */}
      <Snackbar 
        open={toast.open} 
        autoHideDuration={3000} 
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// --- SUB-COMPONENTS ---

const ConversationsList = ({ conversations, activeChat, isOnline, onSelect }) => (
  <Box className="conversations-list-container">
    <Box className="conversations-header">
      <Typography variant="h6" fontWeight="bold">Messages</Typography>
      <Badge badgeContent={conversations.length} color="primary" sx={{ ml: 1 }}>
        <ChatIcon color="action" />
      </Badge>
    </Box>
    <Divider />
    <List className="conversations-list">
      {conversations.map((convo) => (
        <ListItemButton 
          key={convo._id}
          onClick={() => onSelect(convo)} 
          selected={activeChat?.id === convo._id}
          className={`conversation-item ${activeChat?.id === convo._id ? 'active' : ''}`}
        >
          <ListItemAvatar>
            <Badge overlap="circular" variant="dot" color={isOnline(convo._id) ? "success" : "default"}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>{convo.userInfo?.name?.charAt(0).toUpperCase()}</Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText 
            primary={<Typography fontWeight={activeChat?.id === convo._id ? 600 : 400}>{convo.userInfo?.name}</Typography>} 
            secondary={
                <Typography variant="body2" noWrap color="text.secondary" sx={{ opacity: 0.8 }}>
                    {convo.lastMessage}
                </Typography>
            }
          />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

const GuidelinesContent = () => (
    <Stack spacing={3} className="guidelines-content">
        <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={1} color="primary.main">
                <VerifiedUser fontSize="small" />
                <Typography variant="subtitle2" fontWeight="bold">Safety First</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
                Verify neighbor details before sharing personal info or meeting up.
            </Typography>
        </Box>
        
        <Divider />

        <Box>
             <Stack direction="row" alignItems="center" spacing={1} mb={1} color="warning.main">
                <Security fontSize="small" />
                <Typography variant="subtitle2" fontWeight="bold">Smart Tips</Typography>
            </Stack>
            <Stack spacing={1.5}>
                <Box display="flex" gap={1}>
                    <Lock fontSize="inherit" sx={{ mt: 0.3, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">Avoid sharing bank details.</Typography>
                </Box>
                <Box display="flex" gap={1}>
                    <LocationOn fontSize="inherit" sx={{ mt: 0.3, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">Meet in public spots.</Typography>
                </Box>
            </Stack>
        </Box>
        
        <Divider />

        <Box className="privacy-badge">
            <PrivacyTip fontSize="small" sx={{ mb: 0.5 }} /> 
            <Typography variant="caption" display="block">End-to-End Encrypted</Typography>
        </Box>
    </Stack>
);

export default Messages;