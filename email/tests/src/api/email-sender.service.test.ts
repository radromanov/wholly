import "@shared/utils/dotenv";
import { EmailSenderService, IEmailSenderService } from "@api/email-sender";
import { NodemailerAdapter } from "@lib/adapters";

describe("Email Sender Service", () => {
  let emailSender: IEmailSenderService;

  beforeEach(() => {
    const emailApi = new NodemailerAdapter({
      isSandbox: process.env.NODE_ENV !== "production", // isSandbox === true if not in production
    });
    emailSender = new EmailSenderService(emailApi);
  });

  describe("Method Validation", () => {
    const availableMethods = [
      "activate",
      "deactivate",
      "sendEmail",
      "isActive",
    ];
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
        body: "This is a mock email",
      });
    });
  });
});
