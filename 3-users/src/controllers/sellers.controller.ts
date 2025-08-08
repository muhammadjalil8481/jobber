import {
  BadRequestError,
  ISellerDocument,
} from "@muhammadjalil8481/jobber-shared";
import {
  getRandomSellersService,
  getSellerByIdService,
  getSellerByUsernameService,
} from "@users/services/seller.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getSellerById = async (req: Request, res: Response): Promise<void> => {
  const context = "sellers.controller.ts/getSellerById()";
  const seller: ISellerDocument | null = await getSellerByIdService(
    req.params.sellerId
  );
  if (!seller) throw new BadRequestError("Seller not found", context);
  res.status(StatusCodes.OK).json({ message: "Seller profile", data: seller });
};

const getSellerByUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  const context = "sellers.controller.ts/getSellerById()";
  const seller: ISellerDocument | null = await getSellerByUsernameService(
    req.params.username
  );
  if (!seller) throw new BadRequestError("Seller not found", context);
  res.status(StatusCodes.OK).json({ message: "Seller profile", data: seller });
};

const getRandomSellers = async (req: Request, res: Response): Promise<void> => {
  const sellers: ISellerDocument[] = await getRandomSellersService(
    parseInt(req.params.size)
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Random sellers profile", data: sellers });
};

export { getSellerById, getSellerByUsername, getRandomSellers };
