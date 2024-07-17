import { ROUTES } from "@lib/constants";
import { endpoints } from "@lib/utils";
import supertest from "supertest";

describe("/auth/sign-up", () => {
  const endpoint = `/api/v1${ROUTES.ROOT}${ROUTES.SIGNUP}`;

  describe("Method Validation", () => {
    const unavailableMethods = ["get", "put", "patch", "delete"] as const;

    unavailableMethods.forEach((method) => {
      it(`should respond with 405 if ${method} method`, async () => {
        await supertest(endpoints)[method](endpoint).expect(405);
      });
    });
  });
  describe("OPTIONS /", () => {});
  describe("POST /", () => {});
});
