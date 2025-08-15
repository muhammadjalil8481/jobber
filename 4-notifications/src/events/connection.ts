import { createConnection } from "@muhammadjalil8481/jobber-shared";
import { Channel } from "amqplib";
import { log } from "../logger";
import { config } from "@notification/config";
import { consumeAuthUserCreationMessage } from "./consumers/authUserCreation";

async function createEventConnection(): Promise<Channel | undefined> {
  const channel = await createConnection({
    log,
    connectionUrl: config.RABBITMQ_ENDPOINT,
  });
  consumeAuthUserCreationMessage(channel!);
  return channel;
}

export { createEventConnection };
