import "express-async-errors";
import express from "express";
import { errorHandlerMiddleware } from "@muhammadjalil8481/jobber-shared";
import { log } from "./logger";
import { startServer } from "./server";
import { initializeGlobalMiddleware } from "./middlewares/global.middleware";
import router from "./router/router";

const app = express();

initializeGlobalMiddleware(app);

app.use(router);

startServer(app);

app.use(
  errorHandlerMiddleware({
    log,
    serviceName: "Users Service",
  })
);

export { app };
