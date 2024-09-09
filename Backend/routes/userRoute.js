const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  findUserLogs,
  findUserToken,
} = require("../controllers/adminController");
router.get("/users/:id", requireAuth, findUserLogs);

router.get("/token/:id", requireAuth, findUserToken);
module.exports = router;
