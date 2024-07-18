import { Request, Response, NextFunction } from "express";
import { BaseError, Database } from "../core";
import { InternalServerError } from "../errors";

export const dbOpen = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Perform any initialization or checks here if needed
    // For example, logging or authentication checks

    // Open database connection
    Database.getInstance();

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof BaseError) {
      next(error);
    } else {
      next(new InternalServerError());
    }
  }
};
