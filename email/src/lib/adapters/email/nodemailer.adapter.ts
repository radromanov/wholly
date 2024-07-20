import {
  EmailAdapterOptions,
  SendEmailInput,
  SendEmailOutput,
} from "@lib/types";
import EmailAdapter from "./email.adapter";

class NodemailerAdapter extends EmailAdapter {
  constructor(
    options: EmailAdapterOptions = {
      isSandbox: process.env.NODE_ENV !== "production",
    }
  ) {
    super(options);
  }

  async sendEmail(options: SendEmailInput): Promise<SendEmailOutput> {
    if (!this.isSandbox) {
      // Production environment
      console.log("Sending nodemailer production email with opts:", options);
    } else {
      // Development/testing environment
      console.log("Sending nodemailer dev/test email with opts:", options);
    }

    return {
      to: options.to,
      status: "success",
    };
  }
}

export default NodemailerAdapter;
