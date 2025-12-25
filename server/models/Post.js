const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    default: "No description provided"
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
  contact: { 
    type: String, 
    default: "Chat only" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    index: { expires: '24h' } 
  }
}, { timestamps: true });

// নিশ্চিত করুন এখানে postSchema.index({ location: '2dsphere' }) জাতীয় কিছু যেন লেখা না থাকে।

module.exports = mongoose.model('Post', postSchema);