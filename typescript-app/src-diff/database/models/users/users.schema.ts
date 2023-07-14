import { Schema } from "mongoose";
import { setLastUpdated, sameEmail, generateAuthToken } from "./users.methods";
import { findByAge, build, findByCredentials } from "./users.statics";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  age: Number,
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 4,
    required: true,
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

UserSchema.statics.findByAge = findByAge;
UserSchema.statics.build = build;
UserSchema.statics.findByCredentials = findByCredentials;

UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.methods.sameEmail = sameEmail;
UserSchema.methods.generateAuthToken = generateAuthToken;

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default UserSchema;
