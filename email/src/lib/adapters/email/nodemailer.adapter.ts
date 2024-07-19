import { EmailApi } from "@lib/interfaces";
import { EmailAdapterOptions, SendEmailOptions } from "@lib/types";

class NodemailerAdapter implements EmailApi {
  private _isSandbox: boolean;

  constructor(options: EmailAdapterOptions) {
    this._isSandbox = options.isSandbox;
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    if (!this._isSandbox) {
      // Production environment
      console.log("Sending nodemailer production email with opts:", options);
    } else {
      // Development/testing environment
      console.log("Sending nodemailer dev/test email with opts:", options);
    }
  }
}

export default NodemailerAdapter;
