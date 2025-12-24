const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1. Register User (Sign Up)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // চেক করা ইউজার আগে থেকেই আছে কিনা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // পাসওয়ার্ড হ্যাশ করা (সিকিউরিটির জন্য)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // নতুন ইউজার তৈরি
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: { id: newUser._id, name: newUser.name } });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. Login User (Sign In)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // পাসওয়ার্ড মিলিয়ে দেখা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // লগইন সফল
    res.status(200).json({ 
      message: "Login successful!", 
      user: { id: user._id, name: user.name, email: user.email } 
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};