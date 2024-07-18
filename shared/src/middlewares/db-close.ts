import { Request, Response, NextFunction } from "express";
import { Database } from "../core";

export const dbClose = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const instance = Database.getInstance();

  await instance.close();
  next();
};
