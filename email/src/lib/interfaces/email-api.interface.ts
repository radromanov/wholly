import { SendEmailOutput, SendEmailInput } from "@lib/types";

export interface EmailApi {
  sendEmail(options: SendEmailInput): Promise<SendEmailOutput>;
}
