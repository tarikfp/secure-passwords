const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { encrypt, compare, decrypt } = require("../custom-services/Encryption");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("surname", "Surname is required").not().isEmpty(),
    check("email", "Please provide valid e-mail").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, surname, email, password } = req.body;
      // Check if user already exists with the given emai
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists With That E-Mail" }] });
      }
      const hashedData = encrypt(password);
      user = new User({
        name,
        surname,
        email,
        password: hashedData.password,
        iv: hashedData.iv,
      });
      await user.save();
      return res.status(200).send();
    } catch (err) {
      return res.status(500).send();
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Please provide valid e-mail").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      // Check if the user exists in db
      let user = await User.findOne({ email });
      // User not found with the given email
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Check if the password is true
      const isMatch = compare(password, {
        iv: user.iv,
        password: user.password,
      });
      // User not found with the given password
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
      };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || config.get("jwtSecret"),
        {
          expiresIn: 480000,
        }
      );
      await user.save();
      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
);

router.get("/auth", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
