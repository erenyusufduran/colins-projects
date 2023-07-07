import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017/todo");
export const db = mongoClient.db();
export const mongoLoader = async () => {
  try {
    await mongoClient.connect();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
