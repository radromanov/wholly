import "module-alias/register";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { AuthServiceConfig } from "@shared/config";

const authConfig = new AuthServiceConfig();
const { port, env } = authConfig.get();

const api = express();

api.use(cors());
api.use(helmet()); // Add security headers
api.use(morgan("combined")); // Log HTTP requests
api.disable("x-powered-by"); // Hide Express server information

api.get("/", (_req, res) => res.json({ health: "very ok" }));

api.listen(port, () =>
  console.log(`Auth Service running on port ${port} in ${env} mode.`)
);
