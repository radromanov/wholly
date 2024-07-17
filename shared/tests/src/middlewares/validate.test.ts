import express, { Express } from "express";
import supertest from "supertest";
import z from "zod";
import { validate } from "../../../src/middlewares";

describe("Validation middleware", () => {
  let schema: z.ZodSchema;
  let app: Express;

  beforeAll(() => {
    app = express();

    app.use(express.json());
  });

  describe("Body request", () => {
    const endpoint = "/signup";
    beforeAll(() => {
      schema = z.object({
        body: z.object({
          email: z.string().email(),
        }),
      });
      app.post(endpoint, validate(schema), (req, res) => {
        res.status(200).json({ body: req.body });
      });
    });

    it("should parse the body in the request and respond with 200", async () => {
      await supertest(app)
        .post(endpoint)
        .send({ email: "test@email.com" })
        .expect(200);
    });

    it("should parse the body in the request and respond with 422", async () => {
      await supertest(app)
        .post(endpoint)
        .send({ email: "testemail.com" })
        .expect(400);
    });
  });

  describe("Params request", () => {
    beforeAll(() => {
      schema = z.object({
        params: z.object({
          id: z.string().min(2),
        }),
      });

      app.get("/:id", validate(schema), (req, res) => {
        res.status(200).json({ params: req.params });
      });
    });

    it("should parse the params in the request and respond with 200", async () => {
      await supertest(app).get(`/12`).expect(200);
    });

    it("should parse the params in the request and respond with 400", async () => {
      await supertest(app).get(`/1`).expect(400);
    });
  });

  describe("Query request", () => {
    beforeAll(() => {
      schema = z.object({
        query: z.object({
          id: z.string().min(2),
        }),
      });

      app.get("/", validate(schema), (req, res) => {
        res.status(200).json({ query: req.query });
      });
    });

    it("should parse the query in the request and respond with 200", async () => {
      await supertest(app).get("/").query({ id: 12 }).expect(200);
    });

    it("should parse the query in the request and respond with 400", async () => {
      await supertest(app).get("/").query({ id: 1 }).expect(400);
    });
  });

  describe("Body and Query request", () => {
    const endpoint = "/signup";

    beforeAll(() => {
      schema = z.object({
        body: z.object({
          email: z.string().email(),
        }),
        query: z.object({
          id: z.string(),
        }),
      });

      app.post(endpoint, validate(schema), (req, res) => {
        console.log(req.body, req.query);
        res.status(200).json({ body: req.body, query: req.query });
      });
    });

    it("should parse the body and query in the request and respond with 200", async () => {
      await supertest(app)
        .post(endpoint)
        .query({ id: 12 })
        .send({ email: "test@email.com" })
        .expect(200);
    });

    it("should parse the body and query in the request and respond with 400", async () => {
      await supertest(app)
        .post(endpoint)
        .query({ id: 12 })
        .send({ email: "testemail.com" })
        .expect(400);
    });
  });
});
