const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = new Comment({
    content,
    post: postId,
    author: req.user.id,
  });
  await comment.save();
  res.status(201).json(comment);
};

exports.updateComment = async (req, res) => {
  const { content } = req.body;
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (comment.author.toString() !== req.user.id) {
    return res.status(401).json({ message: "User not authorized" });
  }
  comment.content = content;
  await comment.save();
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("post");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.author.toString() === req.user.id ||
      comment.post.author.toString() === req.user.id
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      res.json({ message: "Comment deleted successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "User not authorized to delete this comment" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCommentsForPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate(
    "author",
    "firstName lastName imageUrl"
  );
  res.json(comments);
};

exports.getCommentById = async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate(
    "author",
    "firstName lastName imageUrl"
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(comment);
};
