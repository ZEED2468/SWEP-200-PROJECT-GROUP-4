// const express = require('express');
// const requireAuth = require('../middleware/requireAuth');
// const matricController = require('../controllers/matricController');

// const router = express.Router();

// router.post('/verify', requireAuth, matricController.matricQuery);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { matricQuery } = require('../controllers/matricController');

// Route to handle matric query
router.post('/verify', matricQuery);

module.exports = router;
