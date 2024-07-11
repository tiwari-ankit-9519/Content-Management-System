const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5h" });
};

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dob,
    gender,
    address,
    phoneNumber,
  } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      gender,
      address,
      phoneNumber,
      imageUrl,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        address: user.address,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        address: user.address,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
