import {
  getGigByIdService,
  makeGigInactiveService,
} from "@gigs/services/write-services";
import { BadRequestError } from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const makeGigInactive = async (
  req: Request,
  res: Response
): Promise<void> => {
  const context = `inactive.ts/makeGigInactive()`;

  const gig = await getGigByIdService(req.params.id);
  if (!gig)
    throw new BadRequestError(
      `Gig with id: ${req.params.id} not found`,
      context
    );

  const updatedGigData = await makeGigInactiveService(req.params.id);

  res.status(StatusCodes.ACCEPTED).json({
    message: "Gig inactivated successfully",
    data: updatedGigData,
  });
};
