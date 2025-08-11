import {
  BadRequestError,
  IBuyerDocument,
  isEmail,
} from "@muhammadjalil8481/jobber-shared";
import {
  getBuyerByEmailService,
  getBuyerByUsernameService,
} from "@users/services/buyer.service";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getBuyerByEmail = async (req: Request, res: Response): Promise<void> => {
  const context = "users.controller.ts/getBuyerByEmail()";
  const email = req.params?.email;
  if (!email || !isEmail(email))
    throw new BadRequestError("Email is invalid", context);
  const buyer: IBuyerDocument | null = await getBuyerByEmailService(email);
  if (!buyer) throw new BadRequestError("Buyer not found", context);
  res.status(StatusCodes.OK).json({ message: "success", data: buyer });
};

const getBuyerByUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  const context = "users.controller.ts/getBuyerByUsername()";
  const username = req.params?.username;
  if (!username) throw new BadRequestError("Username is invalid", context);
  const buyer: IBuyerDocument | null = await getBuyerByUsernameService(
    username
  );
  if (!buyer) throw new BadRequestError("Buyer not found", context);

  res.status(StatusCodes.OK).json({ message: "success", data: buyer });
};

export { getBuyerByEmail, getBuyerByUsername };
