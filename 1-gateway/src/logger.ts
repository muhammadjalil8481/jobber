import { LogLevel, } from "@muhammadjalil8481/jobber-shared";
import { winstonLogger } from "./sx";

const log = winstonLogger({
  name: "gateway-service",
  level: LogLevel.DEBUG,
});

export { log };
