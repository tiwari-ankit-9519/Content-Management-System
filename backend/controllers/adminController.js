const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getAllUsersByAdmin = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getUserByIdByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

exports.deleteUserByAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await Post.deleteMany({ author: req.params.id });
  await Comment.deleteMany({ author: req.params.id });
  await User.deleteOne({ _id: req.params.id });
  res.json({
    message: "User and related posts and comments deleted successfully",
  });
};

exports.updateUserRoleByAdmin = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { isAdmin: true } },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User role updated successfully", user });
};

exports.updatePostByAdmin = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body, imageUrl: req.file ? req.file.path : undefined },
    { new: true }
  );
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
};

exports.deletePostByAdmin = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  await Comment.deleteMany({ post: req.params.id });
  res.json({ message: "Post and related comments deleted successfully" });
};

exports.updateCommentByAdmin = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(comment);
};

exports.deleteCommentByAdmin = async (req, res) => {
  await Comment.deleteOne({ _id: req.params.id });
  res.json({ message: "Comment deleted successfully" });
};

exports.getAllPostsByAdmin = async (req, res) => {
  const posts = await Post.find().populate(
    "author",
    "firstName lastName imageUrl"
  );
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "firstName lastName imageUrl"
  );
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
};

exports.getAllCommentsByAdmin = async (req, res) => {
  const comments = await Comment.find()
    .populate("post", "title")
    .populate("author", "firstName lastName imageUrl");
  res.json(comments);
};

exports.getPostsAndCommentsByUser = async (req, res) => {
  const userId = req.params.userId;
  const userPosts = await Post.find({ author: userId }).populate(
    "author",
    "firstName lastName imageUrl"
  );
  const userComments = await Comment.find({ author: userId }).populate(
    "post",
    "title"
  );
  res.json({ posts: userPosts, comments: userComments });
};

exports.getStatsAndRecentItems = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalPosts = await Post.countDocuments();
  const totalComments = await Comment.countDocuments();
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .select("-password");
  const recentPosts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("author", "firstName lastName imageUrl");
  const recentComments = await Comment.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("post", "title")
    .populate("author", "firstName lastName imageUrl");
  res.json({
    totalUsers,
    totalPosts,
    totalComments,
    recentUsers,
    recentPosts,
    recentComments,
  });
};
