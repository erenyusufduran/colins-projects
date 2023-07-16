import { createExpressServer } from "routing-controllers";
import { TodoController } from "../api/controllers/TodoController";

const PORT = process.env.PORT || 3000;

export const expressLoader = async () => {
  const expressApp = await createExpressServer({
    routePrefix: "/api",
    controllers: [TodoController],
    classTransformer: false,
  });
  expressApp.listen(PORT, () => console.log("Exporess server is running on port " + PORT));
};
