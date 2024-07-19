import {
  IEmailApi,
  IEmailSenderService,
  SendEmailOpts,
} from "@api/email-sender";

class MockEmailService implements IEmailSenderService, IEmailApi {
  private _isActive: boolean;
  constructor(private readonly emailApi: IEmailApi) {
    this._isActive = false;
  }

  get isActive() {
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

export default MockEmailService;
