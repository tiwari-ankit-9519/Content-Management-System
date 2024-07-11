const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentController.createComment
);

router.put("/comments/:id", authMiddleware, commentController.updateComment);
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);
router.get("/posts/:postId/comments", commentController.getAllCommentsForPost);
router.get("/comments/:id", commentController.getCommentById);

module.exports = router;
