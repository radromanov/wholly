import { Request, Response, NextFunction } from "express";
import z from "zod";

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!parsed.success) {
        throw new Error(parsed.error.errors[0].message || "Invalid resource");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
