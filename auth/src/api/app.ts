import { Application } from "@core/application";
import { authConfig } from "@lib/utils";

const app = new Application(authConfig);

const endpoints = app.routes();

export { app, endpoints };
