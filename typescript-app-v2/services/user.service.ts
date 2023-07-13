import { Filter } from "mongodb";
import { User, UserWithId, Users } from "../models/user.model";
import { Service } from "../interfaces/service.interface";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService implements Service<User> {
  static createNewUserService(): UserService {
    return new UserService();
  }

  findOne = async (query: Filter<UserWithId>): Promise<UserWithId | null> => {
    const user = Users.findOne({ query });
    if (user) return user;
    return null;
  };

  login = async (userModel: User): Promise<UserWithId | null> => {
    const user = await this.findOne({email: userModel.email});
    if (!user) return null;
    const _user = await this.findByCredentials(user.email, user.password);
    await this.generateAuthToken(_user);
    return user;
  };

  create = async (_user: User): Promise<UserWithId | any> => {
    try {
      const user = await User.parseAsync(_user);
      user.password = await this.hashFunction(user.password);
      const createdUser = await Users.insertOne(user);
      return { _id: createdUser.insertedId, ...user };
    } catch (error) {
      console.log(error);
    }
  };

  private hashFunction = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  private findByCredentials = async (email: string, password: string): Promise<UserWithId> => {
    const user = await Users.findOne({ email });
    if (!user) throw new Error("There is no account with this email!");

    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) throw new Error("Password is wrong!");
    return user;
  };

  generateAuthToken = async (user: UserWithId): Promise<string> => {
    const token = jwt.sign({ _id: user._id.toString() }, "secret");
    user.tokens = user.tokens?.concat({ token });
    await Users.updateOne({ _id: user._id }, { $set: user });
    return token;
  };
}

// export const hashFunction = async (password: string) => {
//   return await bcrypt.hash(password, 10);
// };

// export const comparePassword = async (user: User, password: string) => {
//   return await bcrypt.compare(password, user.password);
// };

// export const generateAuthToken = async (user: User) => {

// };

// export const findByCredentials = async (user: User) => {
// };

// const findUser = async (user: User)  => {
//   await Users.find()
// }
