import { ISellerDocument } from "@muhammadjalil8481/jobber-shared";
import { SellerModel } from "@users/models/seller.model";
import mongoose from "mongoose";

const getSellerByIdService = async (
  sellerId: string
): Promise<ISellerDocument | null> => {
  const id = new mongoose.Types.ObjectId(sellerId);
  const seller: ISellerDocument | null = await SellerModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
  }).exec();

  return seller;
};

const getSellerByUsernameService = async (
  username: string
): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({
    username,
  }).exec();
  return seller;
};

const getSellerByEmailService = async (
  email: string
): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({
    email,
  }).exec();
  return seller;
};

const getRandomSellersService = async (
  size: number
): Promise<ISellerDocument[]> => {
  const sellers: ISellerDocument[] = await SellerModel.aggregate([
    { $sample: { size } },
  ]);
  return sellers;
};

export {
  getSellerByIdService,
  getRandomSellersService,
  getSellerByEmailService,
  getSellerByUsernameService,
};
