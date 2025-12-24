const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const mongoose = require('mongoose');

// ১. মেসেজ পাঠানো
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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

// ২. দুই ইউজারের মধ্যে চ্যাট হিস্ট্রি আনা
router.get('/:userId/:otherId', async (req, res) => {
  try {
    const { userId, otherId } = req.params;

    // আইডি ভ্যালিডেশন
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(otherId)) {
      return res.status(400).json({ message: "Invalid User IDs" });
    }

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

// ৩. ইউজারের সব ইনবক্স লিস্ট (Conversations) আনা
// আপনার ডেটাবেসে নাম না আসার সমস্যার সমাধান এখানে:
router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // কড়া আইডি ভ্যালিডেশন এবং ট্রিম করা
    if (!mongoose.Types.ObjectId.isValid(userId.trim())) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId.trim());

    const conversations = await Message.aggregate([
      // ক. এই ইউজারের সাথে সম্পর্কিত সব মেসেজ খুঁজে বের করা
      { 
        $match: { 
          $or: [
            { senderId: userObjectId }, 
            { receiverId: userObjectId }
          ] 
        } 
      },
      
      // খ. নতুন মেসেজ সবার উপরে রাখা
      { $sort: { createdAt: -1 } },

      // গ. চ্যাট পার্টনারকে গ্রুপ করা (যাতে এক জনের নাম একবারই আসে)
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

      // ঘ. ইউজার কালেকশন (users) থেকে পার্টনারের নাম ও তথ্য আনা
      {
        $lookup: {
          from: 'users', // আপনার ডেটাবেস অনুযায়ী কালেকশন নাম 'users'
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      
      // ঙ. তথ্য ফ্ল্যাট করা (এটি না করলে userInfo অ্যারে হিসেবে থাকবে এবং নাম দেখাবে না)
      { $unwind: "$userInfo" },

      // চ. শুধুমাত্র প্রয়োজনীয় ডাটা পাঠানো (পাসওয়ার্ড ছাড়া)
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          updatedAt: 1,
          "userInfo.name": 1,
          "userInfo._id": 1
        }
      },

      // ছ. সময় অনুযায়ী লিস্ট সাজানো
      { $sort: { updatedAt: -1 } }
    ]);

    // ডিবাগিং এর জন্য আপনার টার্মিনালে চেক করুন
    console.log(`User: ${userId} | Found Conversations: ${conversations.length}`);

    res.json(conversations);
  } catch (err) {
    console.error("Aggregation Error:", err);
    res.status(500).json({ error: "Aggregation failed", details: err.message });
  }
});

module.exports = router;