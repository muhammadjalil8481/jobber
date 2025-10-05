import { parseDeliveryTime } from "@gigs/helpers/helpers";
import { GigModel } from "@gigs/models/gig.model";
import { BadRequestError, ISellerGig } from "@muhammadjalil8481/jobber-shared";

export interface GetSellerGigsParams {
  active: boolean;
}
export interface GetGigsParams {
  search?: string;
  deliveryTime?: string;
  min?: number;
  max?: number;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

export const getGigByIdService = async (id: string) => {
  const gig: ISellerGig | null = await GigModel.findById(id);
  return gig;
};

export const getSellerGigsService = async (
  id: string,
  queryParams: GetSellerGigsParams
) => {
  const { active = true } = queryParams;
  const gigs: ISellerGig[] = await GigModel.find({
    sellerId: id,
    active,
  });
  return gigs;
};

export const getGigsService = async (queryParams: GetGigsParams) => {
  const {
    search,
    deliveryTime,
    min,
    max,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = queryParams;
  const filter: Record<string, any> = {
    active: true,
  };

  if (search) {
    const searchRegex = new RegExp(search, "i"); // "i" = case-insensitive
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { basicDescription: searchRegex },
      { basicTitle: searchRegex },
      { categories: searchRegex },
      { subCategories: searchRegex },
      { tags: searchRegex },
    ];
  }

  if (deliveryTime) {
    const deliveryTimeInMinutes = parseDeliveryTime(deliveryTime);
    filter.expectedDeliveryInMinutes = {
      $lte: deliveryTimeInMinutes,
    };
  }

  if (!Number.isNaN(min) || !Number.isNaN(max)) {
    filter.price = {
      $gte: min || 0,
      $lte: max || Number.MAX_SAFE_INTEGER,
    };
  }

  let sort: Record<string, 1 | -1> = { createdAt: -1 }; // default sort: newest first
  if (sortBy) {
    sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
  }

  const skip = (page - 1) * limit;

  const gigs = await GigModel.find(filter).sort(sort).skip(skip).limit(limit);
  const count = await GigModel.countDocuments(filter);

  const totalPages = Math.ceil(count / limit);
  return { gigs, count, totalPages, currentPage: page, perPage: limit };
};

export const getRelatedGigsService = async (id: string) => {
  const gig = await getGigByIdService(id);
  if (!gig)
    throw new BadRequestError(
      `Gig with id ${id} not found`,
      "get-services.ts/getRelatedGigsService()"
    );
  const searchString = [
    gig.title,
    gig.description,
    gig.basicTitle,
    gig.basicDescription,
    ...(gig.categories || []),
    ...(gig.subCategories || []),
    ...(gig.tags || []),
  ].join(" ");

  const gigs: ISellerGig[] = await GigModel.find(
    {
      _id: { $ne: gig._id },
      active: true,
      $text: { $search: searchString },
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(5);
  return gigs || [];
};

export const getTopGigsByCategoryService = async (category: string) => {
  const gigs = await GigModel.aggregate([
    {
      $match: {
        categories: category,
        active: true,
        ratingsCount: { $gt: 0 },
      },
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: ["$ratingsCount", 0] },
            { $divide: ["$ratingSum", "$ratingsCount"] },
            0,
          ],
        },
      },
    },
    {
      $sort: { averageRating: -1, ratingsCount: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  return gigs || [];
};
