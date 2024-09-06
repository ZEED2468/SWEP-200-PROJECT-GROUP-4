const express = require("express");
const router = express.Router();

const { findUserLogs } = require("../controllers/adminController");
router.get("/:id/users", findUserLogs);

module.exports = router;
