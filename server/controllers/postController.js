const Post = require('../models/Post');
const User = require('../models/User'); // User মডেল ইমপোর্ট
const webpush = require('web-push');    // web-push লাইব্রেরি ইমপোর্ট

// ১. নতুন হেল্প রিকোয়েস্ট তৈরি করা
exports.createPost = async (req, res) => {
  try {
    const { userId, username, title, category, description, location, contact } = req.body;

    // ডিবাগিং
    console.log("📥 Received Post Data:", req.body);

    // ডাটা ভ্যালিডেশন
    if (!userId || !username || !title || !category || !location || !location.lat || !location.lng) {
      return res.status(400).json({
        message: "All required fields must be filled."
      });
    }

    const newPost = new Post({
      userId,
      username: username || "Neighbor",
      title,
      category,
      description: description || "No description provided",
      location: {
        lat: Number(location.lat),
        lng: Number(location.lng)
      },
      contact: contact || "Chat only"
    });

    const savedPost = await newPost.save();
    console.log("✅ Post saved successfully!");

    // ============================================================
    // ৩. নোটিফিকেশন লজিক (Notification Logic)
    // ============================================================
    try {
      // ডেটাবেস থেকে সাবস্ক্রাইব করা ইউজারদের খুঁজুন
      const users = await User.find({ pushSubscription: { $ne: null } });

      // আপনার রিকুয়েন্টমেন্ট অনুযায়ী মেসেজ ফরম্যাট:
      // Title: New Help Request
      // Body: [Name] is asking for help about [Title]
      const notificationPayload = JSON.stringify({
        title: 'New Help Request',
        body: `${username} is asking for help about ${title}`,
        url: '/' //   `/post/${newPost._id}` // নোটিফিকেশনে ক্লিক করলে এই লিংকে যাবে এখানে ক্লিক করলে হোম পেজে যাবে যেখানে কার্ডটি আছে
      });

      // লুপ চালিয়ে নোটিফিকেশন পাঠানো
      users.forEach(user => {
        // ইউজার নিজেকে নোটিফিকেশন পাঠাবে না
        if (user._id.toString() !== userId) {
          webpush.sendNotification(user.pushSubscription, notificationPayload)
            .catch(err => {
              console.error(`Error sending notification to user ${user._id}:`, err);
            });
        }
      });
      
    } catch (notifyErr) {
      console.error("❌ Notification System Error:", notifyErr);
    }
    // ============================================================

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("❌ Database Save Error:", err.message);
    res.status(500).json({
      message: "Failed to create post",
      error: err.message
    });
  }
};

// ২. সব পোস্ট ডাটা আনা
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// ৩. নির্দিষ্ট ইউজারের পোস্টগুলো আনা
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts", error: err.message });
  }
};

// ৪. পোস্ট ডিলিট করা
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};