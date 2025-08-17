import { rabbitMQChannel } from "@gigs/server";
import { IGigCount, publishDirectMessage } from "@muhammadjalil8481/jobber-shared";
import { log } from "../../logger";

export async function publishGigCountIncrementEvent(userId: number) {
  const context = `create-gig.producer.ts/publishCreateGigEvent()`;
  const message : IGigCount = {
    type: "gig_count_increment",
    userId,
    count: 1,
  };

  const isPublished = await publishDirectMessage({
    channel: rabbitMQChannel,
    exchangeName: "gigs_count_ex",
    routingKey: "gigs_count_rk",
    message: JSON.stringify(message),
    logParams: {
      log, // Assuming console is used for logging
      logMessage: `Gig count increment event successfully published - userId: ${userId}`,
      context,
    },
  });

  return isPublished;
}
