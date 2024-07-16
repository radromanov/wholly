import { endpoints } from "@api/app";
import supertest from "supertest";

describe("Server Health Check", () => {
  it("should respond with a 200", async () => {
    await supertest(endpoints).get("/").expect(200);
  });

  it("should respond with a 404", async () => {
    await supertest(endpoints).get("/some-route").expect(404);
  });
});
