import { errorHandlerMiddleware } from "@muhammadjalil8481/jobber-shared";
import express from "express";
import { log } from "./logger";
import { startServer } from "./server";
import router from "./router";

const app = express();

startServer(app);

app.use(router);

app.use(
  errorHandlerMiddleware({
    log,
    serviceName: "Notification Service",
  })
);
