import { Request, Response } from "express";
import EmailSenderService from "./service";

class EmailSenderController {
  constructor(private readonly service: EmailSenderService) {}

  // Using arrow function to bind the context of 'this'
  handleSendEmail = async (req: Request, res: Response) => {
    await this.service.sendEmail(req.body);

    res.sendStatus(200);
  };
}

export default EmailSenderController;
