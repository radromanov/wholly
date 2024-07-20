import {
  EmailAdapterOptions,
  SendEmailInput,
  SendEmailOutput,
} from "@lib/types";
import EmailAdapter from "./email.adapter";

export const mockSendEmail = jest.fn();

class MockmailerAdapter extends EmailAdapter {
  constructor(
    options: EmailAdapterOptions = {
      isSandbox: process.env.NODE_ENV !== "production",
    }
  ) {
    super(options);
  }

  async sendEmail(_options: SendEmailInput): Promise<SendEmailOutput> {
    return mockSendEmail(_options);
  }
}

export default MockmailerAdapter;
