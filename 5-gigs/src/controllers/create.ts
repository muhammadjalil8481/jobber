import { publishGigCountIncrementEvent } from "@gigs/events/producers/create-gig.producer";
import { parseDeliveryTime } from "@gigs/helpers/helpers";
import { createGigService } from "@gigs/services/write-services";
import {
  BadRequestError,
  isDataURL,
  uploads,
} from "@muhammadjalil8481/jobber-shared";
import { ISellerGig } from "@muhammadjalil8481/jobber-shared/dist/types/interfaces/gig.interface";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidV4 } from "uuid";

const createGig = async (req: Request, res: Response): Promise<void> => {
  const context = `create.ts/createGig()`;

  const coverImage = req.body.coverImage;
  const isBase64EncodedcoverImage = isDataURL(coverImage);
  if (!isBase64EncodedcoverImage)
    throw new BadRequestError(
      "Please provide a valid base64 cover image",
      context
    );

  const profilePublicId = uuidV4();
  const uploadCoverImageResult: UploadApiResponse = (await uploads(
    coverImage,
    `${profilePublicId}`,
    true,
    true
  )) as UploadApiResponse;
  if (!uploadCoverImageResult.public_id) {
    throw new BadRequestError("Cover image upload error. Try again", context);
  }

  const expectedDeliveryInMinutes = parseDeliveryTime(req.body.expectedDelivery)

  const gig: ISellerGig = {
    userId: req.currentUser!.id,
    sellerId: req.body.sellerId,
    title: req.body.title,
    basicTitle: req.body.basicTitle,
    description: req.body.description,
    basicDescription: req.body.basicDescription,
    categories: req.body.categories,
    subCategories: req.body.subCategories,
    tags: req.body.tags,
    active: true,
    expectedDelivery: req.body.expectedDelivery,
    expectedDeliveryInMinutes: expectedDeliveryInMinutes,
    price: req.body.price,
    coverImage: `${uploadCoverImageResult?.secure_url}`,
    coverImageId: uploadCoverImageResult.public_id,
  };

  const isPublished = await publishGigCountIncrementEvent(req.currentUser!.id);
  if (!isPublished)
    throw new Error("Failed to publish gig count increment event");

  const createdGig = await createGigService(gig);

  res.status(StatusCodes.CREATED).json({
    message: "Gig created successfully",
    data: createdGig,
  });
};

export { createGig };
