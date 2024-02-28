const express = require("express");
const {
  authMiddleware,
} = require("../middleware/authMiddleware");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sendMessage);

module.exports = router;
