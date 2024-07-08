import { Express, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import proxy from "express-http-proxy";

import { AuthServiceConfig, GatewayServiceConfig } from "@shared/config";

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

    const authConfig = new AuthServiceConfig();
    const authUrl = authConfig.get("url");

    this.app.use("/api/auth", proxy(authUrl));

    return this.app;
  }

  listen(port?: number) {
    const gatewayConfig = new GatewayServiceConfig();

    port = port || gatewayConfig.get("port");

    return this.app.listen(port, () =>
      console.log(
        `API Gateway running on port ${port} in ${gatewayConfig.get(
          "env"
        )} mode.`
      )
    );
  }
}
