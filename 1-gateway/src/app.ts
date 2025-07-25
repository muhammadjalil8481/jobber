import express from "express";
import { startServer } from "./server";
import { initializeGlobalMiddleware } from "./middlewares/global.middleware";
import { verifyUser } from "./middlewares/auth.middleware";
import router from "./router/routes";
import { errorHandlerMiddleware } from "./error-handler";
import { log } from "./logger";

const app = express();

initializeGlobalMiddleware(app);

app.use(verifyUser);

app.use(express.json({ limit: "1mb" })); //Works on ajax request
app.use(express.urlencoded({ limit: "1mb", extended: true })); //Works on html form submissions

app.use(router);

startServer(app);

app.use(
  errorHandlerMiddleware({
    log,
    serviceName: "Gatway Service",
    fileName: "app.ts",
  })
);

export { app };
