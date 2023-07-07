import express, { Request, Response } from "express";
import { Todo } from "../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const todos = await Todo.find({});
  return res.status(200).send(todos);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const todo = Todo.build({ title, description });
    await todo.save();
    return res.status(201).send(todo);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

export { router as todoRouter };
