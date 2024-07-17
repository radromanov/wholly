import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { BaseError } from "../../../src/core";
import { errorHandler } from "../../../src/utils";

class MockError extends BaseError {
  constructor(message: string, status: number) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, MockError.prototype);
  }
}

describe("Error Handler", () => {
  const app = express();
  app.use((_req: Request, _res: Response, _next: NextFunction) => {
    throw new MockError("Test error", 400);
  });
  app.use(errorHandler);

  describe("Custom Errors", () => {
    it("should handle BaseError correctly", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Test error",
        status: 400,
        trace: expect.any(String),
      });
    });
  });

  describe("Default Errors", () => {
    const app = express();
    app.use((_req: Request, _res: Response, _next: NextFunction) => {
      throw new Error("Generic error");
    });
    app.use(errorHandler);

    it("should handle generic errors correctly", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Internal Server Error",
        status: 500,
        trace: expect.any(String),
      });
    });
  });
});
