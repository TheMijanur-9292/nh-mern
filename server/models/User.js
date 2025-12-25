const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // --- নতুন রেটিং এবং ব্যাজ সেকশন ---
  ratings: {
    average: { 
      type: Number, 
      default: 0 
    },
    count: { 
      type: Number, 
      default: 0 
    }
  },
  badge: { 
    type: String, 
    default: "New Neighbor 🌱" // একটু সুন্দর ইমোজি সহ ডিফল্ট ব্যাজ
  },
  // প্রোফাইলে বায়ো বা ছোট বর্ণনা যোগ করার অপশন (ঐচ্ছিক কিন্তু ভালো)
  bio: {
    type: String,
    default: "Helping my community!"
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);