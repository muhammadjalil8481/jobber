import {
  consumeMessage,
  IRoleDocument,
} from "@muhammadjalil8481/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";
import { log } from "@users/logger";
import { createRoleService } from "@users/services/roles.service";

export const consumeAuthRoleCreationMessage = async (
  channel: Channel
): Promise<void> => {
  const context = "role-creation.ts/consumeAuthRoleCreationMessage()";

  await consumeMessage({
    channel,
    exchangeName: "auth_role_creation_ex",
    queueName: "auth_role_creation_queue",
    bindingKey: "auth_role_creation_rk",
    context,
    exchangeType: "direct",
    log,
    handler: async (msg: ConsumeMessage) => {
      const data: IRoleDocument = JSON.parse(msg!.content.toString());
      await createRoleService(data);
    },
  });
};
