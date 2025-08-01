import { log } from "@auth/logger";
import { rabbitMQChannel } from "@auth/server";
import {
  IAuthDocument,
  publishDirectMessage,
} from "@muhammadjalil8481/jobber-shared";

async function publishUserCreationEvent(userData: IAuthDocument) {
  const context = `producer.ts/publishUserCreationEvent()`;
  if (!userData)
    throw new Error(`Invalid user data : ${userData} coming From ${context}`);
  const message = {
    username: userData.username,
    email: userData.email,
    country: userData.country,
    createdAt: userData.createdAt,
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "auth_user_creation_ex",
    routingKey: "user_user_creation_rk",
    message: JSON.stringify(message),
    logParams: {
      log,
      logMessage: `User creation event successfully published - email : ${userData.email}`,
      context,
    },
  });

  return isPublished;
}

export { publishUserCreationEvent };
