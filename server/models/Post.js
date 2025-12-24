const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Emergency", "Medical", "Groceries", "Food", "Lost & Found", "Transport", "Blood", "Repairs", "Pet Care"]
  },
  contact: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  // ২৪ ঘণ্টা পর অটো-ডিলিট করার জন্য এই অংশটি যোগ করা হয়েছে
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // ৮৬৪০০ সেকেন্ড = ২৪ ঘণ্টা
  }
}, { 
  timestamps: true 
});

// প্রো-টিপ: যদি ডাটাবেসে আগে থেকেই অনেক পোস্ট থাকে, 
// তবে অনেক সময় নতুন ইনডেক্স কাজ করে না। সেক্ষেত্রে ডাটাবেস একবার ক্লিয়ার করে নেওয়া ভালো।

module.exports = mongoose.model('Post', postSchema);