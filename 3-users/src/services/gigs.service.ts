import { SellerModel } from "@users/models/seller.model";
import { getSellerByUserIdService } from "./seller.service";

export const updateSellerGigCount = async (userId: number, count: number) => {
  const seller = await getSellerByUserIdService(userId);
  if (!seller) {
    throw new Error(`Seller with userId ${userId} not found`);
  }
  await SellerModel.findByIdAndUpdate(seller._id, {
    $inc: { totalGigs: count },
  });
};
