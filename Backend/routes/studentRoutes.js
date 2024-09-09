const express = require('express');
const { registerStudent } = require('../controllers/studentController');
const upload = require('../utils/multerSetup');

const router = express.Router();

// POST route for student registration with file upload
router.post('/register', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 }
]), registerStudent);

module.exports = router;
