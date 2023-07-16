import "reflect-metadata";
import { expressLoader } from "./loaders/expressLoader";
import { typeormLoader } from "./loaders/typeormLoader";

typeormLoader()
  .initialize()
  .then(() => {
    expressLoader();
  })
  .then(() => console.log("Server is up and running"))
  .catch((err) => console.log(err.message));
