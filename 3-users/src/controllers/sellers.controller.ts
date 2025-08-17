import {
  BadRequestError,
  ISellerDocument,
} from "@muhammadjalil8481/jobber-shared";
import { publishRoleUpdationEvent } from "@users/events/producers/seller-producer";
import {
  getBuyerByIdService,
  updateBuyerService,
} from "@users/services/buyer.service";
import { getRoleByNameService } from "@users/services/roles.service";
import {
  createSellerService,
  getRandomSellersService,
  getSellerByBuyerIdService,
  getSellerByIdService,
  getSellerByUsernameService,
  updateSellerService,
} from "@users/services/seller.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getSellerById = async (req: Request, res: Response): Promise<void> => {
  const context = "sellers.controller.ts/getSellerById()";
  const seller: ISellerDocument | null = await getSellerByIdService(
    req.params.id
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

const createSeller = async (req: Request, res: Response): Promise<void> => {
  const context = "sellers.controller.ts/createSeller()";
  const buyerId = mongoose.Types.ObjectId.createFromHexString(
    req.body.buyerId
  ).toString();
  const buyer = await getBuyerByIdService(buyerId);
  if (!buyer) {
    throw new BadRequestError(`Buyer Id ${buyerId} is invalid`, context);
  }

  const checkIfSellerExist: ISellerDocument | null =
    await getSellerByBuyerIdService(buyerId);
  if (checkIfSellerExist) {
    throw new BadRequestError(
      "Seller already exist. Go to your account page to update.",
      context
    );
  }

  const sellerRole = await getRoleByNameService("seller");
  if (!sellerRole) throw new Error(`Seller Role not found context ${context}`);

  const updatedRoles: number[] = buyer.roles.includes(sellerRole.roleId!)
    ? buyer.roles
    : [...buyer.roles, sellerRole.roleId!];
  publishRoleUpdationEvent(buyer.email!, [...buyer.roles, sellerRole.roleId!]);

  updateBuyerService(buyerId, {
    roles: updatedRoles,
  });

  const seller: Partial<ISellerDocument> = {
    buyerId,
    userId: buyer.userId,
    name: buyer.name,
    username: buyer.username,
    email: buyer.email,
    country: buyer.country,
    description: req.body.description,
    oneliner: req.body.oneliner,
    skills: req.body.skills,
    languages: req.body.languages,
    experience: req.body.experience,
    education: req.body.education,
    socialLinks: req.body.socialLinks,
    certificates: req.body.certificates,
    roles: updatedRoles,
  };

  const createdSeller: ISellerDocument = await createSellerService(seller);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Seller created successfully.", data: createdSeller });
};

const updateSeller = async (req: Request, res: Response): Promise<void> => {
  const seller: Partial<ISellerDocument> = {
    fullName: req.body.fullName,
    description: req.body.description,
    oneliner: req.body.oneliner,
    skills: req.body.skills,
    languages: req.body.languages,
    experience: req.body.experience,
    education: req.body.education,
    socialLinks: req.body.socialLinks,
    certificates: req.body.certificates,
  };
  const updatedSeller: ISellerDocument = await updateSellerService(
    req.params.id,
    seller
  );
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Seller updated successfully.", seller: updatedSeller });
};

export {
  getSellerById,
  getSellerByUsername,
  getRandomSellers,
  createSeller,
  updateSeller,
};
