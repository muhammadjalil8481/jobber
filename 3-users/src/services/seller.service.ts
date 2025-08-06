import { ISellerDocument } from "@muhammadjalil8481/jobber-shared";
import mongoose from "mongoose";

const getSellerById = async (
  sellerId: string
): Promise<ISellerDocument | null> => {
    const id = new mongoose.Types.ObjectId(sellerId);
  const seller: ISellerDocument | null = (await SellerModel.findOne({
    _id: ,
  }).exec()) as ISellerDocument;
  return seller;
};