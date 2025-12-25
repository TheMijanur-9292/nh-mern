import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, Grid, Paper, Typography, List, ListItemAvatar, 
  Avatar, ListItemText, TextField, IconButton, Stack, Badge, ListItemButton, Divider,
  Dialog, DialogTitle, DialogContent, Button, Rating, CircularProgress, Chip, Snackbar, Alert
} from '@mui/material';
import { 
  Send, Chat as ChatIcon, ArrowBack, FiberManualRecord, 
  VerifiedUser, Security, PrivacyTip, InfoOutlined, Star, AccountCircle, WorkspacePremium
} from '@mui/icons-material';
import axios from 'axios';
import { io } from "socket.io-client";

const Messages = () => {
  const { userId: receiverIdFromUrl } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receiverNameFromUrl = queryParams.get('name');

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser ? { ...savedUser, id: savedUser.id || savedUser._id } : null;
  });

  const [activeChat, setActiveChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  // --- প্রোফাইল, রেটিং ও নোটিফিকেশন স্টেট ---
  const [openRating, setOpenRating] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [profileLoading, setProfileLoading] = useState(false);
  const [otherUserData, setOtherUserData] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    if (currentUser?.id) socket.current.emit("addNewUser", currentUser.id);
    socket.current.on("getOnlineUsers", (users) => setOnlineUsers(users));
    socket.current.on("getMessage", (data) => {
      if (activeChat?.id === data.senderId) {
        setMessages((prev) => [...prev, data]);
      }
      fetchConversations(); 
    });
    return () => socket.current.disconnect();
  }, [currentUser, activeChat]);

  const fetchConversations = async () => {
    const uid = currentUser?.id || currentUser?._id;
    if (!uid) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/conversations/${uid}`);
      setConversations(res.data);
      if (!receiverIdFromUrl && res.data.length > 0) {
        const latest = res.data[0];
        navigate(`/messages/${latest._id}?name=${encodeURIComponent(latest.userInfo?.name)}`, { replace: true });
      }
    } catch (err) { console.error("Inbox load failed:", err); }
  };

  useEffect(() => { if (currentUser?.id) fetchConversations(); }, [receiverIdFromUrl]);

  useEffect(() => {
    if (receiverIdFromUrl && receiverIdFromUrl !== "undefined" && currentUser?.id) {
      setActiveChat({ id: receiverIdFromUrl, name: receiverNameFromUrl || 'Neighbor' });
      fetchChatHistory(receiverIdFromUrl);
    }
  }, [receiverIdFromUrl, currentUser]);

  const fetchChatHistory = async (otherId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${currentUser.id}/${otherId}`);
      setMessages(res.data);
    } catch (err) { console.error("History error:", err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat?.id) return;
    const messageData = { senderId: currentUser.id, receiverId: activeChat.id, message: newMessage.trim() };
    try {
      const res = await axios.post('http://localhost:5000/api/messages/send', messageData);
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
      const res = await axios.get(`http://localhost:5000/api/users/${activeChat.id}`);
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
      const res = await axios.post('http://localhost:5000/api/users/rate', {
        userId: activeChat.id,
        star: newValue,
        currentUserId: currentUser.id // ব্যাকএন্ডে পাঠাচ্ছি কে রেটিং দিচ্ছে
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

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const isOnline = (id) => onlineUsers.some(u => u.userId === id);

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100vw', display: 'flex', overflow: 'hidden', position: 'fixed', left: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4} lg={3} sx={{ display: { xs: activeChat ? 'none' : 'block', md: 'block' }, height: '100%', bgcolor: '#fff', borderRight: '1px solid #eee' }}>
          <Box sx={{ p: 3, borderBottom: '1px solid #f5f5f5' }}>
            <Typography variant="h5" fontWeight="900" color="#764ba2">Messages</Typography>
          </Box>
          <List sx={{ overflowY: 'auto', height: 'calc(100% - 85px)', p: 0 }}>
            {conversations.map((convo) => (
              <ListItemButton key={convo._id} onClick={() => navigate(`/messages/${convo._id}?name=${convo.userInfo?.name}`)} selected={activeChat?.id === convo._id} sx={{ py: 2, px: 2, '&.Mui-selected': { bgcolor: '#f3f0ff' } }}>
                <ListItemAvatar>
                  <Badge overlap="circular" variant="dot" color={isOnline(convo._id) ? "success" : "default"} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Avatar sx={{ bgcolor: '#764ba2', width: 48, height: 48 }}>{convo.userInfo?.name?.charAt(0).toUpperCase()}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={<Typography fontWeight="700" noWrap>{convo.userInfo?.name}</Typography>} secondary={convo.lastMessage} secondaryTypographyProps={{ noWrap: true, fontSize: '0.8rem' }} />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        {/* Main Chat Window */}
        <Grid item xs={12} md={8} lg={6} sx={{ display: { xs: activeChat ? 'flex' : 'none', md: 'flex' }, flexDirection: 'column', height: '100%', bgcolor: '#f8f9fb', borderRight: '1px solid #eee' }}>
          {activeChat ? (
            <>
              <Paper elevation={0} sx={{ p: 1.5, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', borderRadius: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={fetchOtherUserProfile}>
                    <IconButton sx={{ display: { md: 'none' }, mr: 1 }} onClick={(e) => { e.stopPropagation(); navigate('/messages'); }}><ArrowBack /></IconButton>
                    <Avatar sx={{ bgcolor: '#764ba2', width: 40, height: 40 }}>{activeChat.name?.charAt(0)}</Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" fontWeight="800" sx={{ lineHeight: 1.2 }}>{activeChat.name}</Typography>
                      <Typography variant="caption" color={isOnline(activeChat.id) ? "success.main" : "text.secondary"}>
                          {isOnline(activeChat.id) ? "● Online" : "Offline"}
                      </Typography>
                    </Box>
                </Box>
                
                <Stack direction="row" spacing={1}>
                  <Button 
                      variant="text" 
                      size="small" 
                      startIcon={<AccountCircle />} 
                      onClick={fetchOtherUserProfile}
                      sx={{ textTransform: 'none', color: '#764ba2', fontWeight: '600' }}
                  >
                      View Profile
                  </Button>
                  <IconButton onClick={() => setOpenRating(true)} sx={{ color: '#764ba2' }}><Star /></IconButton>
                </Stack>
              </Paper>

              <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg, index) => (
                  <Box key={index} sx={{ alignSelf: msg.senderId === currentUser.id ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <Paper elevation={0} sx={{ p: 1.5, px: 2, bgcolor: msg.senderId === currentUser.id ? '#764ba2' : '#fff', color: msg.senderId === currentUser.id ? '#fff' : '#333', borderRadius: msg.senderId === currentUser.id ? '15px 15px 2px 15px' : '15px 15px 15px 2px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                      <Typography variant="body2">{msg.message}</Typography>
                    </Paper>
                  </Box>
                ))}
                <div ref={scrollRef} />
              </Box>

              <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, bgcolor: '#fff', display: 'flex', gap: 1 }}>
                <TextField fullWidth placeholder="Type a message..." size="small" autoComplete='off' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '25px', bgcolor: '#f0f2f5' } }} />
                <IconButton type="submit" disabled={!newMessage.trim()} sx={{ bgcolor: '#764ba2', color: '#fff', '&:hover': { bgcolor: '#5b3a7d' } }}><Send /></IconButton>
              </Box>

              {/* --- প্রোফাইল ভিউ পপআপ --- */}
              <Dialog open={openProfile} onClose={() => setOpenProfile(false)} PaperProps={{ sx: { borderRadius: '15px', width: '100%', maxWidth: 350 } }}>
                <DialogContent>
                  {profileLoading ? (
                    <Box sx={{ textAlign: 'center', py: 5 }}><CircularProgress size={30} sx={{ color: '#764ba2' }} /></Box>
                  ) : otherUserData && (
                    <Box sx={{ textAlign: 'center', pt: 2 }}>
                      <Avatar sx={{ width: 80, height: 80, fontSize: 32, bgcolor: '#764ba2', mx: 'auto', mb: 1 }}>{otherUserData.name?.charAt(0)}</Avatar>
                      
                      {/* ইউজার রোল/ব্যাজ শো করা */}
                      <Chip 
                        icon={<WorkspacePremium sx={{ fontSize: '16px !important' }} />} 
                        label={otherUserData.badge || "New Neighbor"} 
                        size="small"
                        sx={{ mb: 2, bgcolor: '#f3f0ff', color: '#764ba2', fontWeight: 'bold' }} 
                      />

                      <Typography variant="h6" fontWeight="bold">{otherUserData.name}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>{otherUserData.email}</Typography>
                      
                      <Box sx={{ my: 2, p: 2, bgcolor: '#f8f9fb', borderRadius: '10px' }}>
                        <Typography variant="caption" display="block" color="text.secondary">COMMUNITY RATING</Typography>
                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                          <Typography variant="h5" fontWeight="bold" color="#764ba2">
                            {otherUserData.averageRating?.toFixed(1) || "0.0"}
                          </Typography>
                          <Rating value={otherUserData.averageRating || 0} readOnly precision={0.5} size="small" />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          Based on {otherUserData.totalRatings || 0} reviews
                        </Typography>
                      </Box>

                      <Button variant="contained" fullWidth onClick={() => { setOpenProfile(false); setOpenRating(true); }} sx={{ bgcolor: '#764ba2', borderRadius: '20px', textTransform: 'none' }}>Rate this Neighbor</Button>
                    </Box>
                  )}
                </DialogContent>
              </Dialog>

              {/* --- রেটিং ডায়ালগ --- */}
              <Dialog open={openRating} onClose={() => setOpenRating(false)}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Rate {activeChat.name}</DialogTitle>
                <DialogContent sx={{ textAlign: 'center', minWidth: 250, pb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>How was your experience with this neighbor?</Typography>
                    <Rating size="large" value={starValue} onChange={(event, newValue) => handleSendRating(newValue)} />
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <ChatIcon sx={{ fontSize: 80, color: '#ddd' }} />
              <Typography color="text.secondary">Select a conversation</Typography>
            </Box>
          )}
        </Grid>

        {/* Sidebar Guidelines */}
        <Grid item md={0} lg={3} sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', height: '100%', bgcolor: '#fff', p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <VerifiedUser color="primary" sx={{ fontSize: 20 }} /> Neighbor Safety
              </Typography>
              <Typography variant="caption" color="text.secondary">Our community thrives on trust. Always be respectful and kind.</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" fontWeight="700" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 18, color: '#fbc02d' }} /> Privacy Tips
              </Typography>
              <Stack spacing={1.5}>
                {["Don't share bank details.", "Meet in public places.", "Report suspicious behavior."].map((text, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                    <FiberManualRecord sx={{ fontSize: 8, mt: 0.8, color: '#764ba2' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* --- নোটিফিকেশন Snackbar --- */}
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages;