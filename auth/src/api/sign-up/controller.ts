import { Request, Response } from "express";
import { SignupService } from "./service";
import { SignupInput } from "./schema";
import { v7 as uuidv7 } from "uuid";

export class SignupController {
  constructor(private readonly service: SignupService) {}

  handleCreateOne = async (
    req: Request<{}, {}, SignupInput>,
    res: Response
  ) => {
    const { email, firstName, lastName } = req.body; // Email is valid and normalized by validate middleware in sign-up.module
    const id = uuidv7();

    await this.service.createOne({ id, email, firstName, lastName });

    res.json({ email, firstName, lastName });
  };
}
