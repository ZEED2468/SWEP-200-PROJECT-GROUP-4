const express = require('express');
const { verifyFace } = require('../controllers/verificationController');

const router = express.Router();

// POST route to verify face
router.post('/verify-face', verifyFace);

module.exports = router;
