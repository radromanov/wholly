import { Request, Router } from "express";
import { SignupInput, SignupSchema } from "./schema";
import { handleOptions, methodNotImplementedHandler } from "@shared/utils";
import { validate } from "@shared/middlewares";

export class SignupModule {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    this._router
      .post(
        "/",
        validate(SignupSchema),
        (req: Request<{}, {}, SignupInput>, res) => {
          const { email } = req.body; // Email is valid and normalized

          res.json({ email });
        }
      )
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", methodNotImplementedHandler)
      .put("/", methodNotImplementedHandler)
      .patch("/", methodNotImplementedHandler)
      .delete("/", methodNotImplementedHandler);

    return this._router;
  }
}
