export type SendEmailOpts = {
  from: string;
  to: string;
  subject: string;
  body: string;
};

export interface IEmailApi {
  sendEmail(opts: SendEmailOpts): Promise<void>;
}

export interface IEmailSenderService {
  activate(): void;
  deactivate(): void;
  sendEmail(opts: SendEmailOpts): Promise<void>;
}
