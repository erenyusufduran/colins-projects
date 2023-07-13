import { IUserDocument } from "./users.types";
import * as jwt from "jsonwebtoken";

export async function setLastUpdated(this: IUserDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}

export async function sameEmail(this: IUserDocument): Promise<IUserDocument[]> {
  return this.$model("user").find({ email: this.email });
}

export async function generateAuthToken(this: IUserDocument): Promise<string> {
  const token = jwt.sign({ _id: this._id.toString() }, "secret");
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
}
