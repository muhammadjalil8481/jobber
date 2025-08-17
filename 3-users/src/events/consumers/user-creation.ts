import {
  consumeMessage,
  IBuyerDocument,
} from "@muhammadjalil8481/jobber-shared";
import { log } from "@users/logger";
import { createBuyerService } from "@users/services/buyer.service";
import { Channel, ConsumeMessage } from "amqplib";

export const consumeAuthUserCreationMessage = async (channel: Channel): Promise<void> => {
  await consumeMessage({
    channel,
    exchangeName: "auth_user_creation_ex",
    queueName: "auth_user_creation_queue",
    bindingKey: "auth_user_creation_rk",
    context: "user-creation.ts/consumeBuyerDirectMessage()",
    exchangeType: "direct",
    log,
    handler: async (msg: ConsumeMessage) => {
      const data = JSON.parse(msg!.content.toString());
      const { name,username, email, country, createdAt, roles,userId } = data;
      const buyer: IBuyerDocument = {
        userId,
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
