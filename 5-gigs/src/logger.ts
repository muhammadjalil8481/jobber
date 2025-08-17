import { LogLevel, winstonLogger } from "@muhammadjalil8481/jobber-shared";

const log = winstonLogger({
  name: "gigs-service",
  level: LogLevel.DEBUG,
});

export { log };
