const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.use(authMiddleware, adminMiddleware);

router.get("/users", adminController.getAllUsersByAdmin);
router.get("/users/:id", adminController.getUserByIdByAdmin);
router.delete("/users/:id", adminController.deleteUserByAdmin);
router.put("/users/:id/role", adminController.updateUserRoleByAdmin);

router.get("/posts", adminController.getAllPostsByAdmin);
router.get("/posts/:id", adminController.getPostById);
router.get("/posts/user/:userId", adminController.getPostsAndCommentsByUser);
router.put(
  "/posts/:id",
  uploadMiddleware.single("image"),
  adminController.updatePostByAdmin
);
router.delete("/posts/:id", adminController.deletePostByAdmin);

router.get("/comments", adminController.getAllCommentsByAdmin);
router.put("/comments/:id", adminController.updateCommentByAdmin);
router.delete("/comments/:id", adminController.deleteCommentByAdmin);

router.get("/stats", adminController.getStatsAndRecentItems);

module.exports = router;
