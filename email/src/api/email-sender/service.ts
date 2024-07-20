import { SendEamilOutput, SendEmailInput } from "@lib/types";
import { ServiceUnavailable } from "@shared/errors";

class EmailSenderService {
  private isActive = false;
  private static instance: EmailSenderService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new EmailSenderService();
    }

    return this.instance;
  }

  deactivate() {
    console.log(this.isActive);
    this.isActive = false;
  }

  async sendEmail(options: SendEmailInput): Promise<SendEamilOutput> {
    if (!this.isActive) {
      throw new ServiceUnavailable("Email Sender Service is unavailable");
    }

    return {
      to: options.to,
      status: "success",
    };
  }
}

export default EmailSenderService;
