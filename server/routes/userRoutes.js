const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ১. ডিবাগিং চেক: এটি নিশ্চিত করে যে কন্ট্রোলারের সব ফাংশন সঠিকভাবে ইম্পোর্ট হয়েছে
const requiredFunctions = ['signup', 'signin', 'rateUser', 'getUserById'];
requiredFunctions.forEach(fn => {
    if (!userController[fn]) {
        console.error(`❌ Error: userController.${fn} is missing!`);
    }
});

// ২. অথেনটিকেশন রাউটস
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// ৩. ইউজার অ্যাকশন ও প্রোফাইল রাউটস
// নোট: '/rate' কে আইডি প্যারামিটারের উপরে রাখা হয়েছে যাতে 'rate' শব্দটিকে আইডি মনে না করে
router.post('/rate', userController.rateUser);
router.get('/:id', userController.getUserById);
router.get('/all', userController.getAllUsers);
router.post('/subscribe', userController.subscribe);
// একদম শেষে module.exports এর আগে বা অন্যান্য রাউটের সাথে
router.get('/all', userController.getAllUsers);

module.exports = router;

// server/routes/userRoutes.js এর ভেতরে
//Notification সাবস্ক্রিপশন সংরক্ষণের জন্য নতুন রাউট
router.post('/subscribe', async (req, res) => {
  const { subscription, userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId, 
      { pushSubscription: subscription },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});