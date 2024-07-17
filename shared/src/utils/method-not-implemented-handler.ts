import { Request, Response, NextFunction } from "express";
import { MethodNotAllowed } from "../errors";

export function methodNotImplementedHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(
    new MethodNotAllowed(
      `${req.method} method on ${req.path} is not implemented.`
    )
  );
}
