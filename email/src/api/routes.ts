import { Router } from "express";
import { ROUTES } from "@lib/constants";

import {
  EmailSenderController,
  EmailSenderModule,
  EmailSenderService,
} from "./email-sender";
import { NodemailerAdapter } from "@lib/adapters";

export class AppRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    const emailApi = new NodemailerAdapter();
    const emailSenderService = EmailSenderService.getInstance();
    emailSenderService.setEmailApi(emailApi);

    const emailSenderController = new EmailSenderController(emailSenderService);
    const emailSenderModule = new EmailSenderModule(emailSenderController);

    this._router.use(ROUTES.SEND, emailSenderModule.router);

    return this._router;
  }
}
