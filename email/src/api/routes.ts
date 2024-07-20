import { Router } from "express";
import { ROUTES } from "@lib/constants";
import { EmailSenderModule } from "./email-sender";

export class AppRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    const emailSenderModule = new EmailSenderModule();

    this._router.use(ROUTES.SEND, emailSenderModule.router);

    return this._router;
  }
}
