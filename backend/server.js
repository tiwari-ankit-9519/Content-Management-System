require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // Used to parse JSON bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
