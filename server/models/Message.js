const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  // ২৪ ঘণ্টা পর চ্যাট অটো-ডিলিট করার জন্য এই ফিল্ডটি যোগ করা হয়েছে
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // ৮৬৪০০ সেকেন্ড = ২৪ ঘণ্টা
  }
}, { 
  timestamps: true // এটি অটোমেটিক updatedAt ফিল্ডটিও ম্যানেজ করবে
});

// ইনডেক্সিং যাতে চ্যাট হিস্ট্রি এবং ইনবক্স দ্রুত লোড হয়
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ createdAt: 1 }); // টাইম ইনডেক্স দ্রুত ডিলিট করতে সাহায্য করে

module.exports = mongoose.model('Message', messageSchema);