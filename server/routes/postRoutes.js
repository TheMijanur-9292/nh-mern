const express = require('express');
const router = express.Router();

// কন্ট্রোলার ইম্পোর্ট
const postController = require('../controllers/postController');

// ১. সব পোস্ট নিয়ে আসা (ম্যাপের জন্য)
// কন্ট্রোলারের 'getAllPosts' ফাংশনের সাথে কানেক্ট করা হলো
router.get('/', postController.getAllPosts);

// ২. নতুন পোস্ট তৈরি করা
router.post('/', postController.createPost);

// ৩. একটি নির্দিষ্ট ইউজারের সব পোস্ট আনা (প্রোফাইল পেজের জন্য)
// কন্ট্রোলারের 'getPostsByUser' ফাংশনের সাথে কানেক্ট করা হলো
router.get('/user/:userId', postController.getPostsByUser);

// ৪. পোস্ট ডিলিট করা
router.delete('/:id', postController.deletePost);

module.exports = router;