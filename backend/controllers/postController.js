const Post = require("../models/Post");
const categories = require("../config/categories");

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  let imageUrl = req.file ? req.file.path : "";
  if (!categories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }
  try {
    const newPost = new Post({
      title,
      content,
      category,
      imageUrl,
      author: req.user.id,
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content, category } = req.body;
  if (category && !categories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    post.title = title;
    post.content = content;
    post.category = category;
    if (req.file) {
      post.imageUrl = req.file.path;
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await post.remove();
    res.json({ message: "Post removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName imageUrl")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get posts", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "firstName lastName imageUrl"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get post", error: error.message });
  }
};
