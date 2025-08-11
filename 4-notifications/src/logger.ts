import { LogLevel, winstonLogger } from "@muhammadjalil8481/jobber-shared";

const log = winstonLogger({
  name: "notification-service",
  level: LogLevel.DEBUG,
});

export { log };