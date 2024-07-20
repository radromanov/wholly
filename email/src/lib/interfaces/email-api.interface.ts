import { SendEmailInput } from "@lib/types";

export interface EmailApi {
  sendEmail(options: SendEmailInput): Promise<void>;
}
