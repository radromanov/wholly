import { IEmailApi, IEmailSenderService, SendEmailOpts } from "./types";

class EmailSenderService implements IEmailSenderService, IEmailApi {
  private _isActive: boolean;

  constructor(private readonly emailApi: IEmailApi) {
    this._isActive = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  activate(): void {
    this._isActive = true;
  }

  deactivate(): void {
    this._isActive = false;
  }

  async sendEmail(opts: SendEmailOpts): Promise<void> {
    await this.emailApi.sendEmail(opts);
  }
}

export default EmailSenderService;
