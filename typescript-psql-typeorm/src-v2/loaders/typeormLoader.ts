import { Todo } from "../models/Todo";
import { DataSource } from "typeorm";

export const typeormLoader = () => {
  return new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Col41sYs1",
    database: "typeorm-v2",
    entities: [Todo],
    synchronize: true,
  });
};
