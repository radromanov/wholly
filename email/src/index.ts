import "module-alias/register";
import { Server } from "@core/server";
import { emailConfig, express } from "@lib/utils";

new Server(express, emailConfig).listen();
