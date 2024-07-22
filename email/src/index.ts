import "module-alias/register";
import { Server } from "@core/server";
import { emailConfig, express } from "@lib/utils";
import { Application } from "@core/application";

const appInstance = new Application(express);
const app = appInstance.routes(); // Get the configured Express app

new Server(app, emailConfig).listen();
