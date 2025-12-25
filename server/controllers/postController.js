const Post = require('../models/Post');

// ১. নতুন হেল্প রিকোয়েস্ট তৈরি করা
exports.createPost = async (req, res) => {
  try {
    const { userId, username, title, category, description, location, contact } = req.body;

    // ডিবাগিং: সার্ভার টার্মিনালে চেক করুন ডাটা ঠিকমতো আসছে কি না
    console.log("📥 Received Post Data:", req.body);

    // ডাটা ভ্যালিডেশন
    if (!userId || !username || !title || !category || !location || !location.lat || !location.lng) {
      console.log("⚠️ Validation Failed: Missing required fields");
      return res.status(400).json({ 
        message: "সবগুলো প্রয়োজনীয় ফিল্ড পূরণ করা হয়নি বা লোকেশন ডাটা ভুল।" 
      });
    }

    const newPost = new Post({
      userId,
      username: username || "Neighbor", // ডিফেন্সিভ চেক
      title,
      category,
      description: description || "No description provided",
      location: {
        lat: Number(location.lat), // নিশ্চিত করছি এগুলো নাম্বার হিসেবে সেভ হচ্ছে
        lng: Number(location.lng)
      },
      contact: contact || "Chat only"
    });

    const savedPost = await newPost.save();
    console.log("✅ Post saved successfully!");
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("❌ Database Save Error:", err.message);
    res.status(500).json({ 
      message: "Failed to create post", 
      error: err.message // এই এরর মেসেজটি ফ্রন্টএন্ড কনসোলে দেখতে পাবেন
    });
  }
};

// ২. সব পোস্ট ডাটা আনা (ম্যাপের জন্য)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// ৩. নির্দিষ্ট ইউজারের পোস্টগুলো আনা (প্রোফাইলের জন্য)
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