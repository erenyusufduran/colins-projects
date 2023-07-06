import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { collections } from "../services/database.service";

interface IToken {
  token: string;
  _id?: ObjectId;
}

export default class User {
  tokens: IToken[] = [];

  constructor(public name: string, public email: string, public password: string, public _id?: ObjectId) {}

  static async build(name: string, email: string, password: string) {
    const userExist = await collections.users?.findOne({ email });
    if (userExist) throw new Error("User already exists");
    const user = new User(name, email, password);
    user.password = await user.hashPassword(password);
    await collections.users?.insertOne(user);
    return user;
  }

  hashPassword = async (_password: string): Promise<string> => {
    return await bcrypt.hash(_password, 8);
  };

  generateAuthToken = async (): Promise<any> => {
    const token = jwt.sign({ _id: this._id?.toString() }, "secret");
    const user = await collections.users?.findOneAndUpdate(
      { _id: new ObjectId(this._id) },
      { $set: { tokens: this.tokens.concat({ token }) } }
    );
    return { token, user };
  };
}
