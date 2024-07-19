import { IEmailApi, SendEmailOpts } from "@api/email-sender";

// Nodemailer, Mailjet, Sendgrid, etc.
class MockEmailApi implements IEmailApi {
  async sendEmail(opts: SendEmailOpts): Promise<void> {
    console.log("Sending mock email with opts:", opts);
  }
}

export default MockEmailApi;
