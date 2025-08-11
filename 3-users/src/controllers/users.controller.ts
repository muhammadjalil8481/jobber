import {
  BadRequestError,
  isDataURL,
  NotFoundError,
  uploads,
} from "@muhammadjalil8481/jobber-shared";
import {
  getBuyerByEmailService,
  getBuyerByIdService,
  updateBuyerService,
} from "@users/services/buyer.service";
import { getRoleByRoleIdService } from "@users/services/roles.service";
import {
  getSellerByBuyerIdService,
  getSellerByEmailService,
  updateSellerService,
} from "@users/services/seller.service";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidV4 } from "uuid";

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const context = `users.controller.ts/getCurrentUser()`;
  if (!req.currentUser)
    throw new NotFoundError("Current User not found", context);

  const { roleId, email } = req.currentUser;
  const role = await getRoleByRoleIdService(roleId);
  const roleName = role?.name;
  if (!roleName || !email)
    throw new NotFoundError("Current User not found", context);
  const isSeller = roleName === "seller";

  const user = isSeller
    ? await getSellerByEmailService(email)
    : await getBuyerByEmailService(email);

  if (!user) throw new NotFoundError("Current User not found", context);

  res.status(StatusCodes.OK).json({ message: "success", data: user });
};

export const updateProfilePicture = async (req: Request, res: Response) => {
  const context = `users.controller.ts/getCurrentUser()`;
  const base64Image = req.body.image;
  if(!base64Image) throw new BadRequestError("Plese provide an image",context)
  const buyerId = req.params.buyerId;
  const buyer = await getBuyerByIdService(buyerId);
  if (!buyer) throw new BadRequestError("Invalid buyer id", context);

  const seller = await getSellerByBuyerIdService(buyerId);
  if (!seller) throw new BadRequestError("Invalid buyer id", context);

  const isBase64Encoded = isDataURL(base64Image);
  if (!isBase64Encoded)
    throw new BadRequestError("Please provide a valid base64 image", context);

  const profilePublicId = uuidV4();
  const uploadResult: UploadApiResponse = (await uploads(
    base64Image,
    `${profilePublicId}`,
    true,
    true
  )) as UploadApiResponse;
  if (!uploadResult.public_id) {
    throw new BadRequestError("Profile photo upload error. Try again", context);
  }

  await updateBuyerService(buyer._id!.toString(), {
    profilePublicId,
    profilePicture: uploadResult.secure_url,
  });

  await updateSellerService(seller._id!.toString(), {
    profilePublicId,
    profilePicture: uploadResult.secure_url,
  });

  return res.status(201).json({
    status: "success",
    message: "Profile Picture Successfully updated",
  });
};
