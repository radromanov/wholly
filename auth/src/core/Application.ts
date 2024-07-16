import express, { Express } from "express";

export class Application {
  port: number;
  private _app: Express;

  constructor() {
    this.port = 3001;
    this._app = express();
  }

  private setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.setup();

    this.app.get("/", (_req, res) => res.sendStatus(200));

    return this.app;
  }

  get app() {
    return this._app;
  }
}
