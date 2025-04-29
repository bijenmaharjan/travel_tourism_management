const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/user.model");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists in your database
    let user = await userModel.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await userModel.create({
        email,
        username: email.split("@")[0],
        fullname: { firstname: name, lastname: "" },
        password: "", // Or generate a random password
        googleId: payload.sub,
        profilePicture: picture,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
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
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Google login successful",
        token: jwtToken,
        user: {
          email: user.email,
          role: user.role,
          userId: user._id,
          userName: user.username,
        },
      });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
});

module.exports = router;
