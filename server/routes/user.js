const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../middlewares/validator");
const auth = require("../middlewares/auth");

const router = express.Router();

//  REGISTER
router.post("/register", validateRegister, async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      email: email,
      password: passwordHash,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ email: user.email, token });
  } catch (err) {
    if (err.keyValue) {
      return res.status(409).json({ err: "email already exist" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// LOGIN
router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify login
router.get("/verify", auth, async (req, res) => {
  try {
    console.log(1);
    const user = await User.findById(req.user.id, "email");
    if (!user) return res.status(400).json({ error: "Invalid Token." });

    res.status(200).json({ email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//delete all user
// router.delete("/", async (req, res) => {
//   try {
//     await User.deleteMany();
//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: err.message });
//   }
// });

//get all user
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = router;
