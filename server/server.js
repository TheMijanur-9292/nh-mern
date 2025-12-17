// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// রাউট ইম্পোর্ট
const postRoutes = require('./routes/postRoutes'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB কানেকশন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// --- API রাউট ব্যবহার করা ---
app.use('/api/posts', postRoutes); 

app.get('/', (req, res) => {
  res.send('NeighborHelp Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});