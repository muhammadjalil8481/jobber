import {
  getGigByIdService,
  updateGigService,
} from "@gigs/services/write-services";
import {
  BadRequestError,
  isDataURL,
  ISellerGig,
  uploads,
} from "@muhammadjalil8481/jobber-shared";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidV4 } from "uuid";

export const updateGig = async (req: Request, res: Response): Promise<void> => {
  const context = `update.ts/updateGig()`;
  let uploadCoverImageResult: null | UploadApiResponse = null;

  const gig = await getGigByIdService(req.params.id);
  if (!gig)
    throw new BadRequestError(
      `Gig with id: ${req.params.id} not found`,
      context
    );

  const coverImage = req.body.coverImage;
  const isBase64EncodedcoverImage = isDataURL(coverImage);

  if (isBase64EncodedcoverImage) {
    const profilePublicId = uuidV4();
    uploadCoverImageResult = (await uploads(
      coverImage,
      `${profilePublicId}`,
      true,
      true
    )) as UploadApiResponse;
    if (!uploadCoverImageResult?.public_id) {
      throw new BadRequestError("Cover image upload error. Try again", context);
    }
  }

  const updatedGig: ISellerGig = {
    title: req.body.title,
    basicTitle: req.body.basicTitle,
    description: req.body.description,
    basicDescription: req.body.basicDescription,
    categories: req.body.categories,
    subCategories: req.body.subCategories,
    tags: req.body.tags,
    expectedDelivery: req.body.expectedDelivery,
    price: req.body.price,
    coverImage: uploadCoverImageResult?.secure_url || gig.coverImage,
    coverImageId: uploadCoverImageResult?.public_id || gig.coverImageId,
  };

  const updatedGigData = await updateGigService(req.params.id, updatedGig);

  res.status(StatusCodes.ACCEPTED).json({
    message: "Gig updated successfully",
    data: updatedGigData,
  });
};
