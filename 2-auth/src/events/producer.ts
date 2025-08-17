import { config } from "@auth/config";
import { log } from "@auth/logger";
import { rabbitMQChannel } from "@auth/server";
import {
  IAuthDocument,
  IRoleDocument,
  publishDirectMessage,
} from "@muhammadjalil8481/jobber-shared";

async function publishUserCreationEvent(
  userData: IAuthDocument,
  roleId: number
) {
  const context = `producer.ts/publishUserCreationEvent()`;
  if (!userData)
    throw new Error(`Invalid user data : ${userData} coming From ${context}`);
  const message = {
    userId: userData.id,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    country: userData.country,
    createdAt: userData.createdAt,
    roles: [roleId],
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "auth_user_creation_ex",
    routingKey: "auth_user_creation_rk",
    message: JSON.stringify(message),
    logParams: {
      log,
      logMessage: `User creation event successfully published - email : ${userData.email}`,
      context,
    },
  });

  return isPublished;
}

async function publishUserCreationNotificationEvent(userData: IAuthDocument) {
  const context = `producer.ts/publishUserCreationNotificationvent()`;
  if (!userData)
    throw new Error(`Invalid user data : ${userData} coming From ${context}`);
  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${userData.emailVerificationToken}`;

  const message = {
    name: userData.name,
    username: userData.username,
    email: userData.email,
    verificationLink,
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "auth_user_creation_notification_ex",
    routingKey: "auth_user_creation_notification_rk",
    message: JSON.stringify(message),
    logParams: {
      log,
      logMessage: `User creation notification event successfully published - email : ${userData.email}`,
      context,
    },
  });

  return isPublished;
}

async function publishRoleCreationEvent(data: IRoleDocument) {
  const context = `producer.ts/publishRoleCreationEvent()`;
  if (!data)
    throw new Error(`Invalid role data : ${data} coming From ${context}`);
  const message = {
    roleId: data.id,
    name: data.name,
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "auth_role_creation_ex",
    routingKey: "auth_role_creation_rk",
    message: JSON.stringify(message),
    logParams: {
      log,
      logMessage: `Role creation event successfully published - role id : ${data.id}`,
      context,
    },
  });

  return isPublished;
}

export {
  publishUserCreationEvent,
  publishUserCreationNotificationEvent,
  publishRoleCreationEvent,
};
