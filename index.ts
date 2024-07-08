import "module-alias/register";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import proxy from "express-http-proxy";
import { AuthServiceConfig, GatewayServiceConfig } from "@shared/config";

const gatewayConfig = new GatewayServiceConfig();
const { port, env } = gatewayConfig.get();
const authConfig = new AuthServiceConfig();
const authUrl = authConfig.get("url");

const authService = proxy(authUrl);

const app = express();

app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

app.use("/api/auth", authService);

app.listen(port, () =>
  console.log(`API Gateway running on port ${port} in ${env} mode.`)
);
