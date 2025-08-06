import { IBuyerDocument } from "@muhammadjalil8481/jobber-shared";
import { BuyerModel } from "@users/models/buyer.model";

export const createBuyerService = async (
  buyerData: IBuyerDocument
): Promise<void> => {
  const checkIfBuyerExist: IBuyerDocument | null = await getBuyerByEmailService(
    `${buyerData.email}`
  );
  if (!checkIfBuyerExist) {
    await BuyerModel.create(buyerData);
  }
};

export const getBuyerByEmailService = async (
  email: string
): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = (await BuyerModel.findOne({
    email,
  }).exec()) as IBuyerDocument;
  return buyer;
};

export const getBuyerByUsernameService = async (
  username: string
): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = (await BuyerModel.findOne({
    username,
  }).exec()) as IBuyerDocument;
  return buyer;
};
