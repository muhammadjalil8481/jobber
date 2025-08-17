import { createConnection } from "@muhammadjalil8481/jobber-shared";
import { Channel } from "amqplib";
import { log } from "../logger";
import { config } from "@gigs/config";

async function createEventConnection(): Promise<Channel | undefined> {
  const channel = await createConnection({
    log,
    connectionUrl: config.RABBITMQ_ENDPOINT,
  });
  return channel;
}

export { createEventConnection };
