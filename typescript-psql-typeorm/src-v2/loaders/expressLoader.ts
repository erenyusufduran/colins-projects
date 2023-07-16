import { createExpressServer } from "routing-controllers";
import { TodoController, UserController } from "../api/controllers";

const PORT = process.env.PORT || 3000;

export const expressLoader = async () => {
  const expressApp = await createExpressServer({
    routePrefix: "/api",
    controllers: [UserController, TodoController],
    classTransformer: false,
  });
  expressApp.listen(PORT, () => console.log("Express server is running on port " + PORT));
};
