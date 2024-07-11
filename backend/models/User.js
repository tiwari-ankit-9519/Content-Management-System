const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "Male", "Female", "other", "Other"],
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
