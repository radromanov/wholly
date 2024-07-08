import "module-alias/register";

import express from "express";
import { Application } from "@core/Application";

const expr = express();
const app = new Application(expr);

export const routes = app.routes();
export const listener = app.listen();
