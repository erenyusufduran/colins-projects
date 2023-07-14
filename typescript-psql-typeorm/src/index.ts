import { createConnection } from "typeorm";
import { Client } from "./entities/Client";

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Col41sYs1",
      database: "typeorm",
      entities: [Client],
      synchronize: true,
    });
    console.log("Connected to Postgres");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to DB");
  }
};

main();
