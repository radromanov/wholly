import { Request, Response } from "express";
import { SignupService } from "./service";
import { SignupInput } from "./schema";
import { v7 as uuidv7 } from "uuid";
import { emailApi } from "@lib/utils";
import { ROUTES } from "@lib/constants";

export class SignupController {
  constructor(private readonly service: SignupService) {}

  handleCreateOne = async (
    req: Request<{}, {}, SignupInput>,
    res: Response
  ) => {
    const { email, firstName, lastName } = req.body; // Email is valid and normalized by validate middleware in sign-up.module
    const id = uuidv7();

    try {
      // TODO Email Microservice sendVerificationEmailEvent()
      await emailApi.post(`${ROUTES.EMAIL}${ROUTES.SEND}`, {
        from: "noreply@wholly.com",
        to: email,
        subject: "Wholly | Verify your email",
        text: `Hello ${firstName} ${lastName}, please verify your email by clicking on the link below:`,
      });

      // await this.service.createOne({ id, email, firstName, lastName });
      console.log(this.service, id);

      res.json({ email, firstName, lastName });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  };
}
