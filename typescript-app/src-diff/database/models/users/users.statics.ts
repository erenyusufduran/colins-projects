import { UserModel } from "./users.model";
import { IUser, IUserDocument } from "./users.types";
import bcrypt from "bcrypt";

export async function findByAge(min?: number, max?: number): Promise<IUserDocument[]> {
  return await UserModel.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}

export async function build(user: IUser): Promise<IUserDocument> {
  return await UserModel.create(user);
}

export async function findByCredentials(username: string, password: string): Promise<IUserDocument> {
  const user = await UserModel.findOne({ username });
  if (!user) throw new Error(`There is no account with this username: ${username}`);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Pasword is wrong!");
  return user;
}
