import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../database/models/users/users.types";
import { UserModel } from "../database/models/users/users.model";

interface AuthRequest extends Request {
  token?: string;
  user?: IUserDocument;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Login first!");
    const decoded = jwt.verify(token, "secret") as IUserDocument;
    const user = await UserModel.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) throw new Error("There is no user with this token");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send((error as Error).message);
  }
};
