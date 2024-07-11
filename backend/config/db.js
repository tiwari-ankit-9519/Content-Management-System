const mongoose = require("mongoose");
require("dotenv").config();

const DB_CONNECTION_STRING = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
