import { createExpressServer } from "routing-controllers";

export const expressLoader = async () => {
  await createExpressServer({
    classTransformer: true,
    routePrefix: "/api",
    controllers: [],
  });
};
