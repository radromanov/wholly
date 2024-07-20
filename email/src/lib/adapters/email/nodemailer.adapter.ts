import "@shared/utils/dotenv";
import { EmailAdapterOptions, SendEmailInput } from "@lib/types";
import EmailAdapter from "./email.adapter";

const ADAPTER_OPTS_DEFAULTS: EmailAdapterOptions = {
  isSandbox: process.env.NODE_ENV !== "production",
};

class NodemailerAdapter extends EmailAdapter {
  constructor(options = ADAPTER_OPTS_DEFAULTS) {
    super(options);
  }

  async sendEmail(options: SendEmailInput): Promise<void> {
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
