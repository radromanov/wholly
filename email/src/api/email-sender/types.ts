import { SendEmailOptions } from "@lib/types";

export interface IEmailApi {
  sendEmail(opts: SendEmailOptions): Promise<void>;
}

export interface IEmailSenderService {
  sendEmail(opts: SendEmailOptions): Promise<void>;
}
