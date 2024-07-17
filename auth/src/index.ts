import "module-alias/register";
import { Server } from "@core/server";
import { authConfig, express } from "@lib/utils";

new Server(express, authConfig).listen();
