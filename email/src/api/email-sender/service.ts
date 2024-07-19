import { SendEmailOptions } from "@lib/types";
import { IEmailApi, IEmailSenderService } from "./types";

class EmailSenderService implements IEmailSenderService {
  constructor(private readonly emailApi: IEmailApi) {}

  async sendEmail(opts: SendEmailOptions): Promise<void> {
    await this.emailApi.sendEmail(opts);
  }
}

export default EmailSenderService;
