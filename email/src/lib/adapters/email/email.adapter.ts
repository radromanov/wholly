import { EmailApi } from "@lib/interfaces";
import {
  EmailAdapterOptions,
  SendEmailInput,
  SendEmailOutput,
} from "@lib/types";

import { NotImplemented } from "@shared/errors";

abstract class EmailAdapter implements EmailApi {
  private _isSandbox: boolean; // Used to determine current environment -- development/test or production

  protected constructor(options: EmailAdapterOptions) {
    this._isSandbox = options.isSandbox;
  }

  protected get isSandbox() {
    return this._isSandbox;
  }

  async sendEmail(_options: SendEmailInput): Promise<SendEmailOutput> {
    throw new NotImplemented(
      "sendEmail not implemented in parent class. Use derived/child class instead."
    );
  }
}

export default EmailAdapter;
