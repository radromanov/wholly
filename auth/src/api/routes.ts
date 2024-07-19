import { Router } from "express";
import { SignupModule, SignupService } from "./sign-up";
import { ROUTES } from "@lib/constants";
import { SignupController } from "./sign-up/controller";

export class AppRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    const signupService = new SignupService();
    const signupController = new SignupController(signupService);
    const signupModule = new SignupModule(signupController);

    this._router.use(ROUTES.SIGNUP, signupModule.router);

    return this._router;
  }
}
