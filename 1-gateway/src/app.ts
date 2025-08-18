import express from "express";
import { startServer } from "./server";
import { initializeGlobalMiddleware } from "./middlewares/global.middleware";
import { verifyUser } from "./middlewares/auth.middleware";
import router from "./router/routes";
import { log } from "./logger";
import { errorHandlerMiddleware } from "@muhammadjalil8481/jobber-shared";
import { generateServicePath } from "./middlewares/generate-service-path";
import { authProxy, gigsProxy, usersProxy } from "./proxy";

const app = express();

initializeGlobalMiddleware(app);

app.use(verifyUser);

app.use(generateServicePath("auth"), authProxy);
app.use(generateServicePath("users"), usersProxy);
app.use(generateServicePath("gigs"), gigsProxy);


app.use(express.json({ limit: "1mb" })); //Works on ajax request
app.use(express.urlencoded({ limit: "1mb", extended: true })); //Works on html form submissions

app.use(router);

startServer(app);

app.use(
  errorHandlerMiddleware({
    log,
    serviceName: "Gatway Service",
  })
);

export { app };
