const express = require('express');
const router = express.Router();

// কন্ট্রোলার ইম্পোর্ট
const postController = require('../controllers/postController');

// ডিবাগিং-এর জন্য (যদি ফাংশন না পায়, কনসোলে এরর দেখাবে)
if (!postController.getPosts || !postController.createPost) {
  console.error("Error: Controller functions are not defined correctly.");
}

// রাউট সেটআপ
router.get('/', postController.getPosts);
router.post('/', postController.createPost);

module.exports = router;