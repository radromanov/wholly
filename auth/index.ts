import "module-alias/register";

import express from "express";
import cors from "cors";
import { AuthServiceConfig, GatewayServiceConfig } from "@shared/config";

const authConfig = new AuthServiceConfig();
const gatewayConfig = new GatewayServiceConfig();

const { port, env } = authConfig.get();
const gatewayOrigin = gatewayConfig.get("url");

const api = express();

console.log(gatewayOrigin);

api.use(
  cors({
    // Only allow requests from the gateway to come in
    origin: [gatewayOrigin],
  })
);

api.get("/", (_req, res) => res.json({ health: "ok" }));

api.listen(port, () =>
  console.log(`Auth Service running on port ${port} in ${env} mode.`)
);
