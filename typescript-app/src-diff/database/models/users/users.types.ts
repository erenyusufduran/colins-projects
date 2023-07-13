import { Document, Model } from "mongoose";

interface IToken {
  token: string;
}

export interface IUser {
  username: string;
  age: number;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  tokens: IToken[];
  setLastUpdated: (this: IUserDocument) => Promise<void>;
  sameEmail: (this: IUserDocument) => Promise<IUserDocument[]>;
  generateAuthToken: (this: IUserDocument) => Promise<string>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByAge: (min?: number, max?: number) => Promise<IUserDocument[]>;
  build: (user: IUser) => Promise<IUserDocument>;
  findByCredentials: (username: string, password: string) => Promise<IUserDocument>;
}
