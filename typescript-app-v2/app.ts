import express from "express";
import { mongoLoader } from "./loaders/mongo.loader";

const app = express();
const PORT = 3000;

app.use(express.json());

mongoLoader()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((error: Error) => {
    throw new Error(error.message);
  });
