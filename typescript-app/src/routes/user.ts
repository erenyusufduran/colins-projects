import express, { Request, Response } from "express";
import { User } from "../models";
import { auth, AuthRequest } from "../middlewares/auth";
import { UserDoc } from "../models/user";

const router = express.Router();

interface LoginRegisterResponse {
  user: UserDoc;
  token: string;
}

router.post("/register", async (req: Request, res: Response<LoginRegisterResponse | string>) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.build({ name, email, password });
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error)
    res.status(500).send((error as Error).message);
  }
});

router.post("/login", async (req: Request, res: Response<LoginRegisterResponse | string>) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post("/logout", auth, async (req: AuthRequest, res: Response<void | string>) => {
  try {
    if (req.user) {
      const tokens = req.user.tokens.filter((_token) => _token.token !== req.token);
      req.user.tokens = tokens;
      await req.user.save();
      res.send();
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.post("/logoutEverywhere", auth, async (req: AuthRequest, res: Response<void | string>) => {
  try {
    if (req.user) {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    }
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/me", auth, async (req: AuthRequest, res: Response<UserDoc>) => {
  res.send(req.user);
});

router.get("/:id", async (req: AuthRequest, res: Response<UserDoc | string>) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send("Invalid credentials!");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

export { router as userRouter };
