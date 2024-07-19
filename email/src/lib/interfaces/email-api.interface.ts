import { SendEmailOptions } from "@lib/types";

export interface EmailApi {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
