import "reflect-metadata";
import { mongoLoader } from "./loaders/mongo.loader";
import { expressLoader } from "./loaders/express.loader";
import { bootstrapMicroframework } from "microframework";

bootstrapMicroframework([mongoLoader, expressLoader]).then(() => console.log("Running..."));
