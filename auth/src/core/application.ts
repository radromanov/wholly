import express, { Express } from "express";
import helmet from "helmet";

import { dbClose, dbOpen, errorHandler } from "@shared/middlewares";
import { AppRoutes } from "@api/routes";
import { ROUTES } from "@lib/constants";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.setup();
    const api = new AppRoutes();

    this.app.use(dbOpen);
    this.app.get("/", (_req, res) => res.sendStatus(200)); // Health check, used in tests
    this.app.use(`/api/v1${ROUTES.ROOT}`, api.router);
    this.app.use(dbClose);
    this.app.use(errorHandler);

    return this.app;
  }
}
