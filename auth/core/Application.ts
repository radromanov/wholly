import { Express, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { AuthServiceConfig } from "@shared/config";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(cors()); // Enable CORS
    this.app.use(helmet()); // Add security headers
    this.app.use(morgan("combined")); // Log HTTP requests
    this.app.disable("x-powered-by"); // Hide Express server information
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  routes() {
    this.setup();

    this.app.get("/", (_req, res) => res.json({ health: "very ok" }));

    return this.app;
  }

  listen(port?: number) {
    const authServiceConfig = new AuthServiceConfig();

    port = port || authServiceConfig.get("port");

    return this.app.listen(port, () =>
      console.log(
        `API Gateway running on port ${port} in ${authServiceConfig.get(
          "env"
        )} mode.`
      )
    );
  }
}
