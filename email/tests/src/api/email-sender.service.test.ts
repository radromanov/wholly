import "@shared/utils/dotenv";
import { EmailSenderService, IEmailSenderService } from "@api/email-sender";
import { NodemailerAdapter } from "@lib/adapters";

describe("Email Sender Service", () => {
  let emailSender: IEmailSenderService;

  beforeEach(() => {
    const emailApi = new NodemailerAdapter();
    emailSender = new EmailSenderService(emailApi);
  });

  describe("Method Validation", () => {
    const availableMethods = ["sendEmail"];
    availableMethods.forEach((method) => {
      it(`should contain ${method} method`, () => {
        expect(emailSender).toHaveProperty(method);
      });
    });
  });

  describe("sendEmail method", () => {
    it("should send an email with provided options", async () => {
      await emailSender.sendEmail({
        from: "wholly@noreply.com",
        to: "test@email.com",
        subject: "Mock Email",
        text: "This is a mock email",
      });
    });
  });
});
