import { createConnection } from "@muhammadjalil8481/jobber-shared";
import { config } from "@users/config";
import { log } from "@users/logger";
import { Channel } from "amqplib";
import { consumeAuthUserCreationMessage } from "./consumers/user-creation";
import { consumeAuthRoleCreationMessage } from "./consumers/role-creation";
import { consumeGigCountEvent } from "./consumers/gig-count";

async function createEventConnection(): Promise<Channel | undefined> {
  const channel = await createConnection({
    log,
    connectionUrl: config.RABBITMQ_ENDPOINT,
  });
  await consumeAuthUserCreationMessage(channel!);
  await consumeAuthRoleCreationMessage(channel!);
  await consumeGigCountEvent(channel!);
  return channel;
}

export { createEventConnection };
