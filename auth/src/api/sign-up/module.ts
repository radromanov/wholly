import { Router } from "express";
import { handleOptions, methodNotImplementedHandler } from "@shared/utils";

export class SignupModule {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    this._router
      .post("/", (req, res) => {
        const { email } = req.body;

        res.json({ email });
      })
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", methodNotImplementedHandler)
      .put("/", methodNotImplementedHandler)
      .patch("/", methodNotImplementedHandler)
      .delete("/", methodNotImplementedHandler);

    return this._router;
  }
}
