const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // নতুন কন্টাক্ট ফিল্ড
  contact: {
    type: String,
    required: true 
  },
  category: {
    type: String,
    enum: ['Emergency', 'Tools', 'Food', 'Lost & Found', 'Other'],
    default: 'Emergency'
  },
  // জিও-লোকেশন ফিল্ড
  location: {
    type: {
      type: String, 
      default: 'Point' 
    },
    coordinates: {
      type: [Number], // [Longitude, Latitude]
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ইনডেক্সিং
postSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Post', postSchema);