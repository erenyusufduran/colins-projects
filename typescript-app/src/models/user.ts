import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IToken {
  token: string;
  _id: string;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  tokens: IToken[];
  generateAuthToken(): Promise<string>;
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): Promise<UserDoc>;
  findByCredentials(email: IUser["email"], password: IUser["password"]): Promise<UserDoc>;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    validate(value: string) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not container 'password'");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("todos", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret", { expiresIn: "7 days" });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.build = async (attr: IUser) => {
  try {
    return await new User(attr).save();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

userSchema.statics.findByCredentials = async (email: IUser["email"], password: IUser["password"]) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("There is no account with this id");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Passwords is wrong");
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User };
