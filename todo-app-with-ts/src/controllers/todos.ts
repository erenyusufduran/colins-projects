import { Response, Request } from "express";
import { ITodo } from "../types/todo";
import Todo from "../models/todo";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).send({ todos });
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status } = req.body as Pick<ITodo, "name" | "description" | "status">;
    const todo: ITodo = new Todo({ name, description, status });
    await todo.save();
    res.status(201).send({ todo });
  } catch (error) {
    throw error;
  }
};
