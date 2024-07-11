const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  console.log("Received body:", req.body);
  if (req.file) {
    console.log("Received file:", req.file);
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "gender",
    "address",
    "phoneNumber",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    if (req.file) {
      user.imageUrl = req.file.path;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
