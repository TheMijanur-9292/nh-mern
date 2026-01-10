const express = require('express');
const { createServer } = require('http'); // Socket.io-র জন্য প্রয়োজনীয়
const { Server } = require('socket.io'); // Socket.io ক্লাস
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const webpush = require('web-push');

// ১. সবার আগে এনভায়রনমেন্ট ভেরিয়েবল লোড করতে হবে
dotenv.config(); 

// Routes Import
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

// ২. এনভায়রনমেন্ট লোড হওয়ার পর Web Push কনফিগারেশন করতে হবে
// ডিবাগিং: কীগুলো ঠিকঠাক লোড হয়েছে কিনা চেক করা (প্রয়োজনে কনসোল লগ দেখতে পারেন)
if (!process.env.PUBLIC_VAPID_KEY || !process.env.PRIVATE_VAPID_KEY) {
    console.error("❌ Error: VAPID Keys are missing in .env file!");
}

webpush.setVapidDetails(
  'mailto:mijanurmolla9292@gmail.com', // আপনার ইমেইল
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const app = express();
const httpServer = createServer(app); // HTTP সার্ভার তৈরি করা হলো

// Socket.io সেটআপ (CORS কনফিগারেশন সহ)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // আপনার ফ্রন্টএন্ড URL
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Neighbor Help API is Live with Socket.io & WebPush! 🚀');
});

// --- Socket.io Real-time Logic ---
let onlineUsers = []; // অনলাইনে থাকা ইউজারদের লিস্ট

io.on("connection", (socket) => {
  console.log("Connected to Socket:", socket.id);

  // ১. ইউজার জয়েন করলে তাকে অনলাইন লিস্টে অ্যাড করা
  socket.on("addNewUser", (userId) => {
    if (userId && !onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId: userId,
        socketId: socket.id
      });
      console.log("Online Users:", onlineUsers);
    }
    // সব ইউজারকে অনলাইন লিস্ট আপডেট জানানো
    io.emit("getOnlineUsers", onlineUsers);
  });

  // ২. রিয়েল-টাইম মেসেজ হ্যান্ডেল করা
  socket.on("sendMessage", (message) => {
    const receiver = onlineUsers.find((user) => user.userId === message.receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", message);
    }
  });

  // ৩. ইউজার ডিসকানেক্ট হলে
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected. Remaining Online:", onlineUsers.length);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
// এখানে app.listen এর বদলে httpServer.listen ব্যবহার করা হয়েছে
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});