import { GigModel } from "@gigs/models/gig.model";
import { BadRequestError } from "@muhammadjalil8481/jobber-shared";
import { ISellerGig } from "@muhammadjalil8481/jobber-shared/dist/types/interfaces/gig.interface";
import { getGigByIdService } from "./get-services";



const createGigService = async (data: ISellerGig) => {
  const gig = await GigModel.create(data);
  return gig;
};


const makeGigInactiveService = async (id: string) => {
  const context = "get.ts/makeGigInactiveService()";
  const gigExists = await getGigByIdService(id);
  if (!gigExists)
    throw new BadRequestError(`Gig with id: ${id} not found`, context);
  const gig: ISellerGig = (await GigModel.findByIdAndUpdate(
    id,
    {
      active: false,
    },
    {
      new: true,
    }
  )) as ISellerGig;

  return gig;
  //after updating gig publish the message to user service
};

const makeGigActiveService = async (id: string) => {
  const context = "get.ts/makeGigActiveService()";
  const gigExists = await getGigByIdService(id);
  if (!gigExists)
    throw new BadRequestError(`Gig with id: ${id} not found`, context);
  const gig: ISellerGig = (await GigModel.findByIdAndUpdate(
    id,
    {
      active: true,
    },
    {
      new: true,
    }
  )) as ISellerGig;

  return gig;
  //after updating gig publish the message to user service
};

const updateGigService = async (id: string, data: Partial<ISellerGig>) => {
  const context = "get.ts/updateGigService()";
  const gigExists = await getGigByIdService(id);
  if (!gigExists)
    throw new BadRequestError(`Gig with id: ${id} not found`, context);
  const gig = await GigModel.findByIdAndUpdate(
    id,
    {
      ...data,
    },
    { new: true }
  );
  return gig;
};



export {
  createGigService,
  makeGigInactiveService,
  updateGigService,
  makeGigActiveService,
};
