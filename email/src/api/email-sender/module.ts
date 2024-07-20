import { Router } from "express";
import { handleOptions, methodNotImplementedHandler } from "@shared/utils";
import { validate } from "@shared/middlewares";
import { SendEmailInputSchema } from "@lib/types";

class EmailSenderModule {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    this._router
      .post("/", validate(SendEmailInputSchema), async (req, res) => {
        console.log("Sending email", req.body);
        res.sendStatus(200);
      })
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", methodNotImplementedHandler)
      .put("/", methodNotImplementedHandler)
      .patch("/", methodNotImplementedHandler)
      .delete("/", methodNotImplementedHandler);

    return this._router;
  }
}

export default EmailSenderModule;
