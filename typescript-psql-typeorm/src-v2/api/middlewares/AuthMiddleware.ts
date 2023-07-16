import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Token, User } from "../../models";

export interface AuthRequest extends Request {
  token: string;
  user: User;
}

@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  public async use(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) throw new Error("Login first!");
      const decoded = jwt.verify(token, "secret") as User;
      const tokenDoc = await Token.findOneBy({ id: token });
      if (!tokenDoc) throw new Error("There is no user with this token.");
      const user = await User.findOneBy({ username: decoded.username });
      if (!user) throw new Error("There is no user with this token");
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
