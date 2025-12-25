const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User'); // ইউজার মডেল নিশ্চিত করুন
const mongoose = require('mongoose');

// ইউজারের সব ইনবক্স লিস্ট আনা
router.get('/conversations/:userId', async (req, res) => {
  try {
    const rawUserId = req.params.userId;
    
    // ১. আইডি থেকে কোনো স্পেস থাকলে তা মুছে ফেলা
    const userIdStr = rawUserId.trim();

    // ২. শক্তিশালী আইডি চেক
    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      console.log("Invalid ID Detected:", userIdStr);
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userIdStr);

    const conversations = await Message.aggregate([
      // ৩. এই ইউজারের সাথে জড়িত সব মেসেজ ম্যাচ করা
      {
        $match: {
          $or: [
            { senderId: userObjectId },
            { receiverId: userObjectId }
          ]
        }
      },
      // ৪. সময় অনুযায়ী সর্ট করা
      { $sort: { createdAt: -1 } },
      // ৫. চ্যাট পার্টনারকে গ্রুপ করা
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userObjectId] },
              "$receiverId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$message" },
          updatedAt: { $first: "$createdAt" }
        }
      },
      // ৬. ইউজার কালেকশন থেকে তথ্য আনা
      {
        $lookup: {
          from: 'users', // ডাটাবেসে চেক করুন এটি 'users' ই আছে কি না
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: "$userInfo" },
      // ৭. ডাটা প্রজেক্ট করা
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          updatedAt: 1,
          "userInfo.name": 1,
          "userInfo._id": 1
        }
      },
      { $sort: { updatedAt: -1 } }
    ]);

    res.status(200).json(conversations);
  } catch (err) {
    console.error("Inbox API Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// মেসেজ হিস্ট্রি আনা
router.get('/:userId/:otherId', async (req, res) => {
  try {
    const { userId, otherId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherId },
        { senderId: otherId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// মেসেজ পাঠানো
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      message: message.trim()
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  // এই লাইনটি নিশ্চিত করুন অথবা যুক্ত করুন
  createdAt: { type: Date, default: Date.now } 
}, { timestamps: true });

// 🔥 এই লাইনটিই ২৪ ঘণ্টা পর অটো-ডিলিট করবে (86400 সেকেন্ড = 24 ঘণ্টা)
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = router;