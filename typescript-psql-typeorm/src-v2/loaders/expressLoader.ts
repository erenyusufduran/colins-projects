import { createExpressServer } from "routing-controllers";
import { TodoController, UserController } from "../api/controllers";
import { AuthMiddleware } from "src-v2/api/middlewares/AuthMiddleware";

const PORT = process.env.PORT || 3000;

export const expressLoader = async () => {
  const expressApp = await createExpressServer({
    routePrefix: "/api",
    controllers: [UserController, TodoController],
    middlewares: [AuthMiddleware],
    classTransformer: false,
  });
  expressApp.listen(PORT, () => console.log("Express server is running on port " + PORT));
};
