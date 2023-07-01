import express, { Request, Response } from "express";
import { User } from "../models";

const router = express.Router();

router.post("/users", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = User.build({ name, email, password });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ error });
  }
});

export { router as userRouter };
