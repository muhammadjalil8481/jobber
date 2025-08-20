import { parseDeliveryTime } from "@gigs/helpers/helpers";
import { GigModel } from "@gigs/models/gig.model";
import { ISellerGig } from "@muhammadjalil8481/jobber-shared";

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
