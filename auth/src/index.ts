import "module-alias/register";
import { Server } from "@core/Server";
import { app } from "@api/app";

const server = new Server(app);

server.listen();
