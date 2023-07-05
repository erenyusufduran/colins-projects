import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserDoc } from "../models/user";

export interface AuthRequest extends Request {
  token?: string;
  user?: UserDoc;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("There is no token");
    const decoded = jwt.verify(token, "secret") as UserDoc;
    const user = await User.findOne({_id: decoded._id, "tokens.token": token });
    if (!user) throw new Error("There is no user with this token");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};
