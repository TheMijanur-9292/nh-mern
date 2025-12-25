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

module.exports = router;