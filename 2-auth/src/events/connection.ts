import { createConnection } from "@muhammadjalil8481/jobber-shared";
import { config } from "@auth/config";
import { log } from "@auth/logger";
import { Channel } from "amqplib";

async function createEventConnection(): Promise<Channel | undefined> {
  const channel = await createConnection({
    log,
    connectionUrl: config.RABBITMQ_ENDPOINT,
  });
  return channel;
}

export { createEventConnection };
