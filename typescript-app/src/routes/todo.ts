import { Router, Request, Response } from "express";
import { Todo } from "../models";
import { AuthRequest, auth } from "../middlewares/auth";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({});
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.get("/me", auth, async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ owner: req.user?._id });
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.get("/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const todos = await Todo.find({ owner: _id });
    res.send(todos);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.post("/", auth, async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const todo = Todo.build({ title, description, owner: req.user?._id });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export { router as todoRouter };
