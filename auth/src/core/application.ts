import express, { Express } from "express";
import helmet from "helmet";

import { errorHandler } from "@shared/utils";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.setup();

    this.app.get("/", (_req, res) => res.sendStatus(200));
    this.app.use(errorHandler);

    return this.app;
  }
}
