const mongoose = require("mongoose");
const validator = require("validator");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      required: true,
      validate(val) {
        if (val.toLowerCase().includes("password")) {
          throw new Error("Password can not contain 'password'");
        }
      },
    },
    lastRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7 days" });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("There is no user with this mail");

  const isMatch = await bcrpyt.compare(password, user.password);
  if (!isMatch) throw new Error("Passwords didn't match.");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrpyt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
