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

export const getSellerByBuyerIdService = async (
  id: string
): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = (await SellerModel.findOne({
    buyerId: id,
  }).exec()) as ISellerDocument;
  return seller;
};

export const getSellerByUserIdService = async (
  id: number
): Promise<ISellerDocument | null> => {
  const sellers: ISellerDocument[] = (await SellerModel.find({
  }).exec()) as ISellerDocument[];
  return sellers.find((slr)=>slr.userId == id) || null ;
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

const createSellerService = async (
  sellerData: Partial<ISellerDocument>,
): Promise<ISellerDocument> => {
  const createdSeller: ISellerDocument = (
    await SellerModel.create(sellerData)
  )[0] as ISellerDocument;
  return createdSeller;
};

const updateSellerService = async (
  sellerId: string,
  sellerData: Partial<ISellerDocument>,
): Promise<ISellerDocument> => {
  const updatedSeller: ISellerDocument = (await SellerModel.findOneAndUpdate(
    { _id: sellerId },
    {
      $set: {
        name: sellerData.fullName,
        description: sellerData.description,
        skills: sellerData.skills,
        oneliner: sellerData.oneliner,
        languages: sellerData.languages,
        experience: sellerData.experience,
        education: sellerData.education,
        socialLinks: sellerData.socialLinks,
        certificates: sellerData.certificates,
        profilePicture: sellerData.profilePicture,
        profilePublicId: sellerData.profilePublicId
      },
    },
    { new: true }
  ).exec()) as ISellerDocument;
  return updatedSeller;
};


export {
  getSellerByIdService,
  getRandomSellersService,
  getSellerByEmailService,
  getSellerByUsernameService,
  createSellerService,
  updateSellerService
};
