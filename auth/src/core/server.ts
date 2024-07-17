import { Express } from "express";
import { EnvSchema } from "@lib/types";
import { Config } from "@shared/core";

export class Server {
  constructor(
    private readonly app: Express,
    private readonly config: Config<EnvSchema>
  ) {}

  listen(port?: number) {
    port = port || parseInt(this.config.get("PORT"), 10);

    return this.app.listen(port, () =>
      console.log(`Auth Microservice running on port ${port}`)
    );
  }
}
