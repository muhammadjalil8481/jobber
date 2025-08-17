import { consumeMessage, IGigCount } from "@muhammadjalil8481/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";
import { log } from "@users/logger";
import { updateSellerGigCount } from "@users/services/gigs.service";

export const consumeGigCountEvent = async (channel: Channel): Promise<void> => {
  const context = "gig-count.ts/consumeGigCount()";

  await consumeMessage({
    channel,
    exchangeName: "gigs_count_ex",
    bindingKey: "gigs_count_rk",
    queueName: "gigs_count_queue",
    context,
    exchangeType: "direct",
    log,
    handler: async (msg: ConsumeMessage) => {
      const data: IGigCount = JSON.parse(msg!.content.toString());
      const { userId, count } = data;
      await updateSellerGigCount(userId, count);
    },
  });
};
