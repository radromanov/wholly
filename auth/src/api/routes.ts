import { Router } from "express";
import { SignupModule } from "./sign-up";
import { ROUTES } from "@lib/constants";

export class AppRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    const signupModule = new SignupModule();

    this._router.use(ROUTES.SIGNUP, signupModule.router);

    return this._router;
  }
}
