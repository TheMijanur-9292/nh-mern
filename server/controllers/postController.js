const Post = require('../models/Post');

// ১. নতুন পোস্ট তৈরি করা
exports.createPost = async (req, res) => {
  try {
    const { title, description, category, contact, location, userId, username } = req.body;

    // ডাটা ভ্যালিডেশন চেক
    if (!title || !category || !location || !userId || !username) {
      return res.status(400).json({ message: "Missing required fields: title, category, location, userId or username." });
    }

    const newPost = new Post({
      title,
      description,
      category,
      contact,
      location,
      userId,
      username
    });

    const savedPost = await newPost.save();
    console.log("✅ New Post Created by:", username);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ২. সব পোস্ট নিয়ে আসা (ম্যাপে দেখানোর জন্য)
exports.getPosts = async (req, res) => {
  try {
    // ডাটাবেস থেকে সব পোস্ট লেটেস্ট থেকে ওল্ড এই অর্ডারে আনা
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৩. একটি নির্দিষ্ট ইউজারের সব পোস্ট দেখা (প্রোফাইল পেজের জন্য)
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৪. পোস্ট ডিলিট করা
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};