import "@shared/utils/dotenv";
import { EmailSenderService } from "@api/email-sender";

describe("Email Sender Service", () => {
  let emailSenderInstance: EmailSenderService;

  beforeAll(() => {
    emailSenderInstance = EmailSenderService.getInstance();
  });

  describe("Method Validation", () => {
    const availableStaticMethods = ["getInstance"];
    const availableInstanceMethods = ["deactivate", "sendEmail"];

    availableStaticMethods.forEach((method) => {
      it(`should contain static ${method} method`, () => {
        expect(EmailSenderService).toHaveProperty(method);
      });
    });

    availableInstanceMethods.forEach((method) => {
      it(`should contain ${method} method`, () => {
        expect(emailSenderInstance).toHaveProperty(method);
      });
    });
  });

  describe("deactivate method", () => {
    it("should throw an error when sending an email if EmailSenderService is deactivated", async () => {
      emailSenderInstance.deactivate();

      await expect(() =>
        emailSenderInstance.sendEmail({
          from: "wholly@noreply.com",
          to: "test@email.com",
          subject: "Test Email Subject",
          text: "Test Email text body",
        })
      ).rejects.toThrow(
        expect.objectContaining({
          status: 503, // Service unavailable
        })
      );
    });
  });
});
