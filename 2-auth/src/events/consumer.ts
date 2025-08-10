import { consumeMessage } from "@muhammadjalil8481/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";
import { log } from "../logger";
import { updateAuthUserRole } from "@auth/services/auth.service";

export const consumeRoleUpdationMessage = async (
  channel: Channel
): Promise<void> => {
  await consumeMessage({
    channel,
    exchangeName: "users_role_updation_ex",
    queueName: "users_role_updation_queue",
    bindingKey: "users_role_updation_rk",
    context: "consumer.ts/consumeRoleUpdationMessage()",
    exchangeType: "direct",
    log,
    handler: async (msg: ConsumeMessage) => {
      const data = JSON.parse(msg!.content.toString());
      const { email, roles } = data;
      await updateAuthUserRole(email, roles);
    },
  });
};
