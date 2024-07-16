import "module-alias/register";
import { Server } from "@core/server";
import { app } from "@api/app";

const server = new Server(app);

server.listen();
