import * as z from "zod";
import { db } from "../loaders/mongo.loader";
import { WithId } from "mongodb";

export const Todo = z.object({
  title: z.string(),
  completed: z.boolean().default(false),
});

export type Todo = z.infer<typeof Todo>
export type TodoWithId = WithId<Todo>
export const Todos = db.collection<Todo>("todos");
