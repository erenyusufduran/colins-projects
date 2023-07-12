import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017/todo");
export const db = mongoClient.db();
export const mongoLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  try {
    await mongoClient.connect();
    if (settings) {
      settings.setData("mongo_client", mongoClient);
      settings.setData("db", db);
      settings.onShutdown(() => mongoClient.close());
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
