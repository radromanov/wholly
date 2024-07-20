import {
  EmailAdapterOptions,
  SendEmailInput,
  SendEmailOutput,
} from "@lib/types";
import { emailConfig } from "@lib/utils";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from "nodemailer";
import EmailAdapter from "./email.adapter";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class NodemailerAdapter extends EmailAdapter {
  constructor(
    options: EmailAdapterOptions = {
      isSandbox: process.env.NODE_ENV !== "production",
    }
  ) {
    super(options);
  }

  async sendEmail(options: SendEmailInput): Promise<SendEmailOutput> {
    const transport = await this.initNodemailer();

    const info = await transport.sendMail(options);

    //@ts-ignore
    if (transport.options.host === "smtp.ethereal.email") {
      // Preview only available when sending through Ethereal
      console.log(`Preview URL: ${getTestMessageUrl(info)}`);
    }

    return {
      to: options.to,
      text: options.text,
      status: "success",
    };
  }

  private async initNodemailer() {
    const { NODE_ENV, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } =
      emailConfig.get();

    let transporter: Transporter<SMTPTransport.SentMessageInfo>;

    try {
      // Create nodemailer transport
      transporter = createTransport({
        host: EMAIL_HOST,
        port: parseInt(EMAIL_PORT, 10),
        secure: NODE_ENV !== "production" ? false : true,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      await transporter.verify(); // Throws error if invalid credentials

      return transporter;
    } catch (error) {
      console.log(
        "Error creating nodemailer transport. Please check if your local NodemailerApp SMTP Server is running. Creating test account..."
      );
      // Create test account
      const testAccount = await createTestAccount();

      transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      return transporter;
    }
  }
}

export default NodemailerAdapter;
