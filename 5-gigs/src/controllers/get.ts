import {
  getGigByIdService,
  getGigsService,
  GetSellerGigsParams,
  getSellerGigsService,
} from "@gigs/services/get-services";
import { BadRequestError } from "@muhammadjalil8481/jobber-shared";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getGigById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const context = `get.ts/getGigById()`;

  const gig = await getGigByIdService(req.params.id);
  if (!gig)
    throw new BadRequestError(
      `Gig with id: ${req.params.id} not found`,
      context
    );

  res.status(StatusCodes.OK).json({
    message: "success",
    data: gig,
  });
};

export const getGigsBySellerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const queryData = req.query as object as GetSellerGigsParams;
  const gigs = await getSellerGigsService(req.params.sellerId, queryData);

  res.status(StatusCodes.OK).json({
    message: "success",
    data: gigs,
  });
};

export const getGigs = async (req: Request, res: Response) => {
  const { gigs, count, totalPages, currentPage, perPage } =
    await getGigsService(req.query);
  res.status(StatusCodes.OK).json({
    message: "success",
    count,
    totalPages,
    currentPage,
    perPage,
    data: gigs,
  });
};
