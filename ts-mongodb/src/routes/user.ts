import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

export const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const _user = await User.build(name, email, password);
    const { token, user } = await _user.generateAuthToken();
    user ? res.status(201).send({ user, token }) : res.status(500).send("Failed to create user!");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});


