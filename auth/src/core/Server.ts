import { Application } from "./Application";

export class Server {
  constructor(private readonly application: Application) {}

  listen(port?: number) {
    port = port || this.application.port;

    return this.application.app.listen(port, () =>
      console.log(`Auth Microservice running on port ${port}`),
    );
  }
}
