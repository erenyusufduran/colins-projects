import { Router, Request, Response } from "express";
import { UserModel } from "../database/models/users/users.model";
import { IUserDocument } from "../database/models/users/users.types";

const router = Router();

interface IUserWithToken {
  user: IUserDocument;
  token: string;
}

router.post("/register", async (req: Request, res: Response<IUserWithToken | string>) => {
  const { username, email, password, age } = req.body;
  try {
    const user = await UserModel.build({ username, email, password, age });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/login", async (req: Request, res: Response<IUserWithToken | string>) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
