import { Application } from "@core/application";
import { express } from "@lib/utils";

const app = new Application(express);

const endpoints = app.routes();

export { app, endpoints };
