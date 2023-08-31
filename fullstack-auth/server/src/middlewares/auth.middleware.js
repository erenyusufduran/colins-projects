require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../db/models/user.model");

const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send({ status: false });
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.status(400).send({ status: false });
    const user = await User.findById(data.id);
    if (user) return res.status(200).send({ status: true, user: user.username });
    return res.status(400).send({ status: false });
  });
};

module.exports = { userVerification };
