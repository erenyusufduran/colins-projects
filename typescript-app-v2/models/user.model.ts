import * as z from "zod";
import { db } from "../loaders/mongo.loader";
import { WithId } from "mongodb";

const Token = z.object({
  token: z.string(),
});

export const User = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 character." }).trim(),
  email: z.string().email({ message: "Give an email" }).trim(),
  password: z.string().min(6, { message: "Password must be at least 6 character." }).max(30).trim(),
  tokens: z.array(Token).optional(),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>("users");
