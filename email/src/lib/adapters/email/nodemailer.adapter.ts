import { EmailAdapterOptions, SendEmailOptions } from "@lib/types";
import EmailAdapter from "./email.adapter";

class NodemailerAdapter extends EmailAdapter {
  constructor(options: EmailAdapterOptions) {
    super(options);
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    if (!this.isSandbox) {
      // Production environment
      console.log("Sending nodemailer production email with opts:", options);
    } else {
      // Development/testing environment
      console.log("Sending nodemailer dev/test email with opts:", options);
    }
  }
}

export default NodemailerAdapter;
