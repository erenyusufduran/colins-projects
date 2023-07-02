import express, { Request, Response } from "express";
import { User } from "../models";

const router = express.Router();

router.post("/users/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = User.build({ name, email, password });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/users/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: "Invalid credentials" });
  }
});

export { router as userRouter };
