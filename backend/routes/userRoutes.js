const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.get("/profile", authMiddleware, userController.getUserProfile);
router.put(
  "/profile",
  [authMiddleware, uploadMiddleware.single("image")],
  userController.updateUserProfile
);

module.exports = router;
