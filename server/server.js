const express = require('express');
const { createServer } = require('http'); 
const { Server } = require('socket.io'); 
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const webpush = require('web-push');

// ১. সবার আগে এনভায়রনমেন্ট ভেরিয়েবল লোড
dotenv.config(); 

// Routes Import
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

// ২. Web Push কনফিগারেশন
if (!process.env.PUBLIC_VAPID_KEY || !process.env.PRIVATE_VAPID_KEY) {
    console.error("❌ Error: VAPID Keys are missing in .env file!");
}

webpush.setVapidDetails(
  'mailto:mijanurmolla9292@gmail.com', 
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const app = express();
const httpServer = createServer(app); 

// ৩. ডাইনামিক CORS সেটআপ (খুবই জরুরি)
// হোস্ট করার পর আপনার ফ্রন্টএন্ড URL এখানে দিতে হবে
const allowedOrigins = [
  "http://localhost:5173", 
  "https://your-frontend-link.vercel.app" // হোস্টিং এর পর আপনার ভার্সেল লিঙ্কটি এখানে বসাবেন
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ৪. Socket.io প্রোডাকশন সেটআপ
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Neighbor Help API is Live! 🚀');
});

// Socket.io রিয়েল-টাইম লজিক
let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    if (userId && !onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const receiver = onlineUsers.find((user) => user.userId === message.receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// ৫. ডাটাবেস কানেকশন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

// ৬. সার্ভার পোর্ট কনফিগারেশন
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});