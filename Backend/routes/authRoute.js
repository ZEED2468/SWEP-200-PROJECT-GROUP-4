const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { register, login, logout } = require("../controllers/authController");
router
  .post("/register", register)
  .post("/login", login)
  .get("/logout", requireAuth, logout);

module.exports = router;
