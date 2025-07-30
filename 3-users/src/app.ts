import "express-async-errors";
import express from "express";
import { startServer } from "./server";
import { initializeGlobalMiddleware } from "./middlewares/global.middleware";
import router from "./router/router";
import { log } from "./logger";
import { errorHandlerMiddleware } from "@muhammadjalil8481/jobber-shared";

const app = express();

initializeGlobalMiddleware(app);

startServer(app);

app.use(router);

app.use(
  errorHandlerMiddleware({
    log,
    serviceName: "Auth Service",
  })
);

export { app };
