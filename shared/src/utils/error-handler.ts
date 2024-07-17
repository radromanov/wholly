import { Request, Response, NextFunction } from "express";
import { BaseError } from "../core";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof BaseError) {
    res.status(error.status).json(error.serialize());
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      trace:
        process.env.NODE_ENV === "production"
          ? "Nothing to see here"
          : error.stack || "Unknown stack trace",
    });
  }
};
