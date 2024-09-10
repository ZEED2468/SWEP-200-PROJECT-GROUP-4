const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const matricController = require('../controllers/matricController');

const router = express.Router();

router.post('/verify-matric', requireAuth, matricController.matricQuery);

module.exports = router;