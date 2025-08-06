import {
  consumeMessage,
  IBuyerDocument,
} from "@muhammadjalil8481/jobber-shared";
import { log } from "@users/logger";
import { createBuyerService } from "@users/services/buyer.service";
import { Channel, ConsumeMessage } from "amqplib";

export const consumeAuthUserCreationMessage = async (channel: Channel): Promise<void> => {
  const exchangeName = "auth_user_creation_ex";
  await consumeMessage({
    channel,
    exchangeName,
    queueName: "auth_user_creation_queue",
    bindingKey: "user_user_creation_rk",
    context: "user-creation.ts/consumeBuyerDirectMessage()",
    exchangeType: "direct",
    log,
    queueOptions: {},
    handler: async (msg: ConsumeMessage) => {
      const data = JSON.parse(msg!.content.toString());
      const { name,username, email, country, createdAt, roles } = data;
      const buyer: IBuyerDocument = {
        name,
        username,
        email,
        country,
        roles,
        createdAt,
        purchasedGigs: [],
      };
      await createBuyerService(buyer);
    },
  });
};
