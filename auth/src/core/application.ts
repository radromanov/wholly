import express, { Express } from "express";
import helmet from "helmet";

import { EnvSchema } from "@lib/types";

import { Config } from "@shared/core";
import { errorHandler } from "@shared/utils";

export class Application {
  port: number;
  private _app: Express;

  constructor(private readonly config: Config<EnvSchema>) {
    this.port = parseInt(this.config.get("PORT"), 10);
    this._app = express();
  }

  private setup() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.setup();

    this.app.get("/", (_req, _res) => {
      throw new Error();
    });
    this.app.use(errorHandler);

    return this.app;
  }

  get app() {
    return this._app;
  }
}
