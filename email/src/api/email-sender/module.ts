import { Router } from "express";
import { handleOptions, methodNotImplementedHandler } from "@shared/utils";
import { catcher, validate } from "@shared/middlewares";
import { SendEmailInputSchema } from "@lib/types";

import EmailSenderController from "./controller";

class EmailSenderModule {
  private _router: Router;

  constructor(private readonly controller: EmailSenderController) {
    this._router = Router();
  }

  get router() {
    this._router
      .post(
        "/",
        validate(SendEmailInputSchema),
        catcher(this.controller.handleSendEmail)
      )
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", methodNotImplementedHandler)
      .put("/", methodNotImplementedHandler)
      .patch("/", methodNotImplementedHandler)
      .delete("/", methodNotImplementedHandler);

    return this._router;
  }
}

export default EmailSenderModule;
