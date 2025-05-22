const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const userController = require("../controllers/auth.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters."),
    check(
      "fullname.firstname",
      "First name must be at least 3 characters long"
    ).isLength({ min: 3 }),
    check(
      "fullname.lastname",
      "Last name must be at least 3 characters long"
    ).isLength({ min: 3 }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  userController.login
);

router.get("/check-auth", userController.authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated", user });
});


router.post("/logout", userController.logoutUser);
module.exports = router;
