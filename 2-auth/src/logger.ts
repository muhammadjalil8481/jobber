import { LogLevel, winstonLogger } from "@muhammadjalil8481/jobber-shared";

const log = winstonLogger({
  name: "auth-service",
  level: LogLevel.DEBUG,
});

export { log };
