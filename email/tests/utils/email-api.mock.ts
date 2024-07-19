import { IEmailApi, SendEmailOpts } from "@api/email-sender";

type EmailApiOpts = {
  isSandbox: boolean;
};

// Nodemailer, Mailjet, Sendgrid, etc.
class MockEmailApi implements IEmailApi {
  private isSandbox: boolean;

  constructor(opts: EmailApiOpts) {
    this.isSandbox = opts.isSandbox ? true : false;
  }

  async sendEmail(opts: SendEmailOpts): Promise<void> {
    if (!this.isSandbox) {
      // Production environment
      console.log("Sending mock production email with opts:", opts);
    } else {
      // Development/testing environment
      console.log("Sending mock dev/test email with opts:", opts);
    }
  }
}

export default MockEmailApi;
