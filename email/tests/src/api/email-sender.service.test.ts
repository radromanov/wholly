import "@shared/utils/dotenv";
import { EmailSenderService } from "@api/email-sender";
import { EmailApi } from "@lib/interfaces";
import { NodemailerAdapter } from "@lib/adapters";
import { SendEmailInput } from "@lib/types";

describe("Email Sender Service", () => {
  let emailSenderInstance: EmailSenderService;

  beforeEach(() => {
    emailSenderInstance = EmailSenderService.getInstance();
  });

  afterEach(() => {
    emailSenderInstance["emailApi"] = undefined; // Reset the emailApi private variable
  });

  describe("Method Validation", () => {
    const availableStaticMethods = ["getInstance"];
    const availableInstanceMethods = ["setEmailApi", "sendEmail"];

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

  describe("setEmailApi method", () => {
    let emailApi: EmailApi;

    beforeAll(() => {
      emailApi = new NodemailerAdapter();
    });

    it("should set the email api", () => {
      emailSenderInstance.setEmailApi(emailApi);

      expect(emailSenderInstance["emailApi"]).toBeTruthy();
    });
  });

  describe("sendEmail method", () => {
    let options: SendEmailInput = {
      from: "wholly-test@noreply.com",
      to: "test@email.com",
      subject: "Mock Email Subject",
      text: "Mock email body",
    };

    it("should throw an error if emailApi is not set", async () => {
      await expect(() =>
        emailSenderInstance.sendEmail(options)
      ).rejects.toThrow(
        expect.objectContaining({
          status: 503,
        })
      );
    });

    it("should send an email if emailApi is set", async () => {
      const emailApi = new NodemailerAdapter();
      emailSenderInstance.setEmailApi(emailApi);

      const res = await emailSenderInstance.sendEmail(options);

      expect(res).toHaveProperty("to");
      expect(res).toHaveProperty("status");
      expect(res.to).toBe(options.to);
      expect(res.status).toBe("success");
    });
  });
});
