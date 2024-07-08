import "module-alias/register";

import express from "express";
import { Application } from "@core/Application";
import { AuthController } from "@api/auth.controller";
import { AuthServiceConfig } from "@shared/config";

const expr = express();
const config = new AuthServiceConfig();
const controller = new AuthController(config);

const app = new Application(expr, controller);

export const routes = app.routes();
export const listener = app.listen();
