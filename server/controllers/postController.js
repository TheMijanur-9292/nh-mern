const Post = require('../models/Post');

// ১. নতুন পোস্ট তৈরি করা
const createPost = async (req, res) => {
  try {
    // এখানে contact রিসিভ করা হচ্ছে
    const { title, description, category, contact, lat, lng } = req.body;

    if (!title || !contact || !lat || !lng) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newPost = new Post({
      title,
      description,
      category,
      contact, // ডাটাবেসে সেভ হচ্ছে
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)] // [Longitude, Latitude]
      }
    });

    await newPost.save();
    res.status(201).json(newPost);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ২. কাছের পোস্ট খুঁজে বের করা
const getNearbyPosts = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and Longitude required" });
    }

    const posts = await Post.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 5000 // ৫০০০ মিটার = ৫ কিমি
        }
      }
    });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getNearbyPosts };