const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, fullname, email, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      user: {
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        userId: newUser._id,
      },
    });
  } catch (error) {
    console.error(`Error occurred during registration: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,

        role: user.role,
        username: user.username,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          email: user.email,
          role: user.role,
          userId: user._id,
          userName: user.username,
          name: user.name,
          token,
        },
      });
  } catch (error) {
    console.error(`Error occurred during login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error occured when login",
    });
  }
};

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`Token verification failed: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};
