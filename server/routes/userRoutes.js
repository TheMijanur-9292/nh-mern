const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API Endpoints
router.post('/signup', userController.registerUser);
router.post('/signin', userController.loginUser);

module.exports = router;