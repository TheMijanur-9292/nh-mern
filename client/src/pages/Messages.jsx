import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, Grid, Paper, Typography, List, ListItemAvatar, 
  Avatar, ListItemText, TextField, IconButton, Stack, Container, Badge, ListItemButton, Divider 
} from '@mui/material';
import { Send, Chat as ChatIcon, ArrowBack } from '@mui/icons-material';
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
    // আপনার ডেটাবেসে _id বা id যেকোনো একটা থাকতে পারে, সেটি হ্যান্ডেল করা হয়েছে
    return savedUser ? { ...savedUser, id: savedUser.id || savedUser._id } : null;
  });

  const [activeChat, setActiveChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  // ১. সকেট কানেকশন
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

  // ২. ইনবক্স লিস্ট (Conversations) লোড করা
  const fetchConversations = async () => {
    const uid = currentUser?.id || currentUser?._id;
    if (!uid) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/messages/conversations/${uid}`);
      setConversations(res.data);
      
      // Navbar Fix: যদি URL এ আইডি না থাকে তবে প্রথম চ্যাটটি অটো লোড করো
      if (!receiverIdFromUrl && res.data.length > 0) {
        const latestChat = res.data[0];
        const partnerName = latestChat.userInfo?.name || 'Neighbor';
        navigate(`/messages/${latestChat._id}?name=${encodeURIComponent(partnerName)}`, { replace: true });
      }
    } catch (err) {
      console.error("Inbox load failed:", err.response?.data?.message || err.message);
    }
  };

  // ৩. ডেটা রিফ্রেশ ও ইনিশিয়াল লোড
  useEffect(() => {
    if (currentUser?.id || currentUser?._id) fetchConversations();
  }, [receiverIdFromUrl]); 

  // ৪. চ্যাট হিস্ট্রি আনা
  useEffect(() => {
    const uid = currentUser?.id || currentUser?._id;
    if (receiverIdFromUrl && receiverIdFromUrl !== "undefined" && uid) {
      setActiveChat({ id: receiverIdFromUrl, name: receiverNameFromUrl || 'Neighbor' });
      fetchChatHistory(receiverIdFromUrl);
    }
  }, [receiverIdFromUrl, currentUser]);

  const fetchChatHistory = async (otherId) => {
    const uid = currentUser?.id || currentUser?._id;
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${uid}/${otherId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("History fetch failed:", err);
    }
  };

  // ৫. মেসেজ পাঠানো
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const uid = currentUser?.id || currentUser?._id;
    if (!newMessage.trim() || !activeChat?.id || !uid) return;

    const messageData = {
      senderId: uid,
      receiverId: activeChat.id,
      message: newMessage.trim()
    };

    try {
      const res = await axios.post('http://localhost:5000/api/messages/send', messageData);
      socket.current.emit("sendMessage", res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
      fetchConversations(); 
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const isOnline = (id) => onlineUsers.some(u => u.userId === id);

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 1, md: 4 }, height: '85vh' }}>
      <Grid container component={Paper} elevation={3} sx={{ height: '100%', borderRadius: '15px', overflow: 'hidden' }}>
        
        {/* বাম পাশ: ইনবক্স লিস্ট */}
        <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #eee', bgcolor: '#fff', display: { xs: activeChat ? 'none' : 'block', md: 'block' } }}>
          <Box sx={{ p: 2, bgcolor: '#764ba2', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">Conversations</Typography>
          </Box>
          <List sx={{ overflowY: 'auto', height: 'calc(100% - 65px)', p: 0 }}>
            {conversations && conversations.length > 0 ? conversations.map((convo) => (
              <React.Fragment key={convo._id}>
                <ListItemButton 
                  onClick={() => navigate(`/messages/${convo._id}?name=${convo.userInfo?.name || 'User'}`)}
                  selected={activeChat?.id === convo._id}
                  sx={{ py: 1.5 }}
                >
                  <ListItemAvatar>
                    <Badge overlap="circular" variant="dot" color={isOnline(convo._id) ? "success" : "default"}>
                      <Avatar sx={{ bgcolor: '#764ba2' }}>
                        {convo.userInfo?.name ? convo.userInfo.name.charAt(0).toUpperCase() : '?'}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={convo.userInfo?.name || "Unknown"} 
                    secondary={convo.lastMessage} 
                    primaryTypographyProps={{ fontWeight: activeChat?.id === convo._id ? 'bold' : 'normal', noWrap: true }}
                    secondaryTypographyProps={{ noWrap: true, fontSize: '0.8rem' }}
                  />
                </ListItemButton>
                <Divider component="li" />
              </React.Fragment>
            )) : (
              <Box sx={{ p: 4, textAlign: 'center', opacity: 0.5 }}>
                <ChatIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2">No conversations yet</Typography>
              </Box>
            )}
          </List>
        </Grid>

        {/* ডান পাশ: চ্যাট উইন্ডো */}
        <Grid item xs={12} md={8} sx={{ display: { xs: activeChat ? 'flex' : 'none', md: 'flex' }, flexDirection: 'column', height: '100%', bgcolor: '#f5f7fb' }}>
          {activeChat ? (
            <>
              {/* চ্যাট হেডার */}
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
                <IconButton sx={{ display: { md: 'none' }, mr: 1 }} onClick={() => navigate('/messages')}><ArrowBack /></IconButton>
                <Avatar sx={{ mr: 2, bgcolor: '#764ba2' }}>{activeChat.name?.charAt(0) || '?'}</Avatar>
                <Box>
                   <Typography variant="subtitle1" fontWeight="bold">{activeChat.name}</Typography>
                   <Typography variant="caption" color={isOnline(activeChat.id) ? "success.main" : "text.secondary"}>
                     {isOnline(activeChat.id) ? "Online" : "Offline"}
                   </Typography>
                </Box>
              </Box>

              {/* মেসেজ এরিয়া */}
              <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                <Stack spacing={2}>
                  {messages.map((msg, index) => {
                    const isMe = msg.senderId === (currentUser?.id || currentUser?._id);
                    return (
                      <Box key={index} sx={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                        <Paper sx={{ 
                          p: 1.5, 
                          bgcolor: isMe ? '#764ba2' : '#fff', 
                          color: isMe ? '#fff' : '#000', 
                          borderRadius: isMe ? '15px 15px 0 15px' : '15px 15px 15px 0',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                          <Typography variant="body1">{msg.message}</Typography>
                        </Paper>
                      </Box>
                    );
                  })}
                  <div ref={scrollRef} />
                </Stack>
              </Box>

              {/* ইনপুট বক্স */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, bgcolor: '#fff', display: 'flex', gap: 1 }}>
                <TextField 
                  fullWidth 
                  placeholder="Type a message..." 
                  size="small" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '25px' } }} 
                />
                <IconButton type="submit" disabled={!newMessage.trim()} sx={{ bgcolor: '#764ba2', color: '#fff', '&:hover': { bgcolor: '#5b3a7d' } }}>
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', opacity: 0.3 }}>
              <ChatIcon sx={{ fontSize: 100, mb: 2 }} />
              <Typography variant="h5">Select a conversation</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messages;