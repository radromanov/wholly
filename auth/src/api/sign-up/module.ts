import { Router } from "express";
import { SignupSchema } from "./schema";
import { handleOptions, methodNotImplementedHandler } from "@shared/utils";
import { catcher, validate } from "@shared/middlewares";
import { SignupController } from "./controller";

export class SignupModule {
  private _router: Router;

  constructor(private readonly controller: SignupController) {
    this._router = Router();
  }

  get router() {
    this._router
      .post(
        "/",
        validate(SignupSchema),
        catcher(this.controller.handleCreateOne)
      )
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", methodNotImplementedHandler)
      .put("/", methodNotImplementedHandler)
      .patch("/", methodNotImplementedHandler)
      .delete("/", methodNotImplementedHandler);

    return this._router;
  }
}
