import { IEmailSenderService } from "@api/email-sender";
import { MockEmailService } from "../../utils";
import MockEmailApi from "../../utils/email-api.mock";

describe("Email Sender Service", () => {
  let emailSender: IEmailSenderService;

  beforeEach(() => {
    const emailApi = new MockEmailApi();
    emailSender = new MockEmailService(emailApi);
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
