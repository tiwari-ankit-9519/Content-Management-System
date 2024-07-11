const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.post(
  "/",
  [authMiddleware, uploadMiddleware.single("image")],
  postController.createPost
);
router.put(
  "/:id",
  [authMiddleware, uploadMiddleware.single("image")],
  postController.updatePost
);
router.delete("/:id", authMiddleware, postController.deletePost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

module.exports = router;
