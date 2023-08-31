const User = require("../db/models/user.model");
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) return res.status(400).send({ message: "User already exists" });
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res.status(201).send({ message: "User signed succesfully", success: true, user });
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "Incorrect password or email" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send({ message: "Incorrect password" });
    const token = createSecretToken(user._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res.status(200).send({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { signUp, login };
