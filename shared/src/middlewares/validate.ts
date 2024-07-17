import z, { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError } from "../errors";
import { BaseError } from "../core";

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const valid = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!valid.success) {
        throw new BadRequest(valid.error.errors[0]?.message);
      }

      // Updating the request if transformations have taken place during validation
      req.body = valid.data.body;
      req.params = valid.data.params;
      req.query = valid.data.query;

      next();
    } catch (error) {
      if (error instanceof ZodError || error instanceof BaseError) {
        next(error);
      } else {
        next(new InternalServerError("Server error during schema validation"));
      }
    }
  };
