import { createExpressServer } from "routing-controllers";
import { MicroframeworkLoader, MicroframeworkSettings } from "microframework";
import { TodoController, UserController } from "../api/controller";

const PORT = process.env.PORT || 3000;

export const expressLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  const expressApp = createExpressServer({
    routePrefix: "/api",
    controllers: [TodoController, UserController],
    classTransformer: false,
  });

  const server = expressApp.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

  settings?.setData("express_app", server);
  settings?.setData("express_app", expressApp);
};
