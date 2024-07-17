import { Request, Response, NextFunction } from "express";

export const handleOptions =
  (methods = ["OPTIONS"]) =>
  (_req: Request, res: Response, _next: NextFunction) => {
    res.header("Access-Control-Allow-Methods", methods.join(","));
    res.header("Accept", "application/json");

    res.sendStatus(204);
  };
