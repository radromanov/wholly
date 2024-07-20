import { EmailApi } from "@lib/interfaces";
import { SendEmailOutput, SendEmailInput } from "@lib/types";
import { ServiceUnavailable } from "@shared/errors";

class EmailSenderService implements EmailApi {
  private emailApi: EmailApi | undefined = undefined;
  private static instance: EmailSenderService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new EmailSenderService();
    }

    return this.instance;
  }

  setEmailApi(api: EmailApi) {
    this.emailApi = api;
  }

  async sendEmail(options: SendEmailInput): Promise<SendEmailOutput> {
    if (!this.validateInstance()) {
      throw new ServiceUnavailable(
        "Email Sender Service is unavailable. Please ensure the Email API has been set before attempting to send an email."
      );
    }

    // We use ! as the emailApi instance has been validated
    return await this.emailApi!.sendEmail(options);
  }

  private validateInstance() {
    if (!this.emailApi) {
      return false;
    }

    return true;
  }
}

export default EmailSenderService;
