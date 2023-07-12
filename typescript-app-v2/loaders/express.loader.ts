import { createExpressServer } from "routing-controllers";
import { TodoController } from "../api/controller/todo.controller";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";

export const expressLoader : MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const expressApp = createExpressServer({
    routePrefix: "/api",
    controllers: [TodoController],
    classTransformer: false,
  });

  const server =  expressApp.listen(3000, () => console.log("server is running"));

  settings?.setData("express_app", server);
  settings?.setData("express_app", expressApp);
};