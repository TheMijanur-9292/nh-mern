// server/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { createPost, getNearbyPosts } = require('../controllers/postController');

// রাউট সেট করা
router.post('/create', createPost);   // POST: http://localhost:5000/api/posts/create
router.get('/nearby', getNearbyPosts); // GET: http://localhost:5000/api/posts/nearby

module.exports = router;