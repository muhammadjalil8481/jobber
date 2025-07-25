import { LogLevel, winstonLogger} from "@muhammadjalil8481/jobber-shared";

const log = winstonLogger({
  name: "gateway-service",
  level: LogLevel.DEBUG,
});

export { log };
