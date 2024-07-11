const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = adminMiddleware;
