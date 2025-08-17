import { publishDirectMessage } from "@muhammadjalil8481/jobber-shared";
import { rabbitMQChannel } from "@users/server";
import {log} from "../../logger"

export async function publishRoleUpdationEvent(email: string, roles: number[]) {
  const context = `seller-producer.ts/publishRoleUpdationEvent()`;
  if (!email || !roles?.length)
    throw new Error(`Email or role is missing. Context ${context}`);
  const message = {
    email,
    roles,
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "users_role_updation_ex",
    routingKey: "users_role_updation_rk",
    message: JSON.stringify(message),
    logParams: {
      log,
      logMessage: `Role updation event successfully published - email : ${email}, roles - ${roles}`,
      context,
    },
  });

  return isPublished;
}
