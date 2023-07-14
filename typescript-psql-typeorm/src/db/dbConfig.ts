import { createConnection } from "typeorm";
import { Client, Banker, Transaction } from "../entities";


export const loadDB = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Col41sYs1",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to DB");
  }
};
