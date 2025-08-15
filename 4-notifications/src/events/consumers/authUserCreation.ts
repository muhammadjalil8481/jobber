import { consumeMessage, IEmailLocals } from "@muhammadjalil8481/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";
import { log } from "@notification/logger";
import { config } from "@notification/config";
import { sendEmail } from "@notification/helpers/sendEmail";

export const consumeAuthUserCreationMessage = async (
  channel: Channel
): Promise<void> => {
  const context = `authUserCreation.ts/consumeAuthUserCreationMessage()`;
  const exchangeName = "auth_user_creation_notification_ex";
  await consumeMessage({
    channel,
    exchangeName,
    queueName: "auth_user_creation_notification_queue",
    bindingKey: "auth_user_creation_notification_rk",
    context: "user-creation.ts/consumeBuyerDirectMessage()",
    exchangeType: "direct",
    log,
    handler: async (msg: ConsumeMessage) => {
      const data = JSON.parse(msg?.content.toString());
      if (!data)
        throw new Error(
          `Data not recieved - exchange ${exchangeName} - context ${context}  `
        );
      const locals: IEmailLocals = {
        appLink: config.CLIENT_URL!,
        appIcon:
          "https://www.shutterstock.com/image-vector/circular-logo-chain-round-link-260nw-2330524625.jpg",
        username: data.username,
        verifyLink: data.verificationLink,
      };
      await sendEmail({
        template: "verifyEmail",
        reciever: data.email,
        locals,
      });
    },
  });
};
