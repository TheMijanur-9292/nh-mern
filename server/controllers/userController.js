const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ১. সাইনআপ (Signup)
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
      badge: "New Neighbor 🌱" // ডিফল্ট ব্যাজ
    });

    await newUser.save();
    res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ২. সাইনইন (Signin)
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
};

// ৩. ইউজারের প্রোফাইল ডাটা আনা (স্মার্ট রেটিং ক্যালকুলেশন সহ)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    // এভারেজ রেটিং ক্যালকুলেশন (যদি মডেলে অ্যারে থাকে)
    let average = 0;
    let count = 0;

    if (user.ratings && Array.isArray(user.ratings)) {
      count = user.ratings.length;
      const sum = user.ratings.reduce((acc, curr) => acc + curr.star, 0);
      average = count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;
    } else {
      // যদি আপনার মডেলে ratings.average ফরম্যাট থাকে
      average = user.ratings?.average || 0;
      count = user.ratings?.count || 0;
    }

    // ফ্রন্টএন্ডে পাঠানোর আগে অবজেক্টটি গুছিয়ে নেওয়া
    const profileData = {
      ...user._doc,
      averageRating: average,
      totalRatings: count
    };

    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// ৪. রেটিং এবং ব্যাজ আপডেট করা (Defense Logic সহ)
exports.rateUser = async (req, res) => {
  try {
    const { userId, star } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // রেটিং আপডেট লজিক
    const currentAverage = user.ratings?.average || 0;
    const currentCount = user.ratings?.count || 0;

    const newCount = currentCount + 1;
    const newAverage = ((currentAverage * currentCount) + Number(star)) / newCount;

    // মডেলে ডাটা সেভ করা
    if (!user.ratings) user.ratings = {};
    user.ratings.average = parseFloat(newAverage.toFixed(1));
    user.ratings.count = newCount;

    // ৫. স্মার্ট ব্যাজ আপডেট সিস্টেম (Gamification)
    if (newCount >= 10 && user.ratings.average >= 4.5) {
      user.badge = "Super Neighbor 🏆";
    } else if (newCount >= 5 && user.ratings.average >= 4.0) {
      user.badge = "Helpful Neighbor ✨";
    } else if (newCount >= 1) {
      user.badge = "Active Neighbor ✅";
    }

    await user.save();
    res.status(200).json({ 
      message: "Rating updated", 
      ratings: user.ratings, 
      badge: user.badge,
      averageRating: user.ratings.average 
    });
  } catch (err) {
    console.error("Rate User Error:", err);
    res.status(500).json({ message: "Failed to update rating", error: err.message });
  }
};
// server/controllers/userController.js
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

//Notification সাবস্ক্রিপশন সংরক্ষণের জন্য নতুন কন্ট্রোলার ফাংশন
exports.subscribe = async (req, res) => {
  const { subscription, userId } = req.body;
  
  if (!userId || !subscription) {
    return res.status(400).json({ error: "User ID and subscription are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId, 
      { pushSubscription: subscription },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`✅ Subscription saved for user: ${user.name}`);
    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error("❌ Subscribe Error:", error.message);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};

// server/controllers/userController.js

// সব ইউজারদের তালিকা আনার জন্য (UserSlider এর জন্য)
exports.getAllUsers = async (req, res) => {
  try {
    // পাসওয়ার্ড বাদে সব ইউজার সিলেক্ট করা
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};