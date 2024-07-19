import "@shared/utils/dotenv";
import { EmailAdapterOptions, SendEmailOptions } from "@lib/types";
import EmailAdapter from "./email.adapter";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { emailConfig } from "@lib/utils";
import { createTransport, getTestMessageUrl, Transporter } from "nodemailer";

const ADAPTER_OPTS_DEFAULTS: EmailAdapterOptions = {
  isSandbox: process.env.NODE_ENV !== "production",
};

class NodemailerAdapter extends EmailAdapter {
  private _transporterOptions: SMTPTransport.Options;
  private _transporter: Transporter<SMTPTransport.SentMessageInfo> | null;
  private _isActive: boolean;

  constructor(options = ADAPTER_OPTS_DEFAULTS) {
    super(options);

    const {
      NODE_ENV,
      NODEMAILER_HOST,
      NODEMAILER_PORT,
      NODEMAILER_USER,
      NODEMAILER_PASS,
    } = emailConfig.get();

    this._transporterOptions = {
      host: NODEMAILER_HOST,
      port: parseInt(NODEMAILER_PORT, 10),
      secure: NODE_ENV === "production",
      auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
      },
    };
    this._transporter = null;
    this._isActive = false;
  }

  private get transporter() {
    if (!this._isActive || !this._transporter) {
      this.setEmailApi();
    }

    return this._transporter!;
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    if (!this.isSandbox) {
      // Production environment
      console.log("Sending nodemailer production email with opts:", options);
    } else {
      // Development/testing environment
      const info = await this.transporter.sendMail(options);
      console.log("Preview URL:", getTestMessageUrl(info));
    }
  }

  setEmailApi(options?: SMTPTransport.Options) {
    options = options || this._transporterOptions;
    this._transporter = createTransport(options);
    this.activate();
  }

  activate() {
    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }
}

export default NodemailerAdapter;
