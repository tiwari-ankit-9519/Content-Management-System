const mongoose = require("mongoose");
const categories = require("../config/categories");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum: categories,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
