import "@shared/utils/dotenv";
import { EmailSenderService } from "@api/email-sender";
import { EmailApi } from "@lib/interfaces";
import { SendEmailInput, SendEmailOutput } from "@lib/types";
import { mockSendEmail, MockmailerAdapter } from "@lib/adapters";

describe("Email Sender Service", () => {
  let emailSenderService: EmailSenderService;

  beforeEach(() => {
    emailSenderService = EmailSenderService.getInstance();
  });

  afterEach(() => {
    (EmailSenderService as any).instance = undefined; // Reset the instance to ensure a fresh state for each test
    emailSenderService["emailApi"] = undefined; // Reset the emailApi private variable
    mockSendEmail.mockReset(); // Reset mock call count
  });

  it("should get the same instance of EmailSenderService", () => {
    const instance1 = EmailSenderService.getInstance();
    const instance2 = EmailSenderService.getInstance();

    expect(instance1).toBe(instance2);
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
        expect(emailSenderService).toHaveProperty(method);
      });
    });
  });

  describe("setEmailApi method", () => {
    let emailApi: EmailApi;

    beforeAll(() => {
      emailApi = new MockmailerAdapter(); // Used to mock the functionality to prevent unnecessary emails being sent
    });

    it("should set the email api", () => {
      emailSenderService.setEmailApi(emailApi);

      expect(emailSenderService["emailApi"]).toBe(emailApi);
    });

    it("should validate the instance correctly", () => {
      emailSenderService.setEmailApi(emailApi);
      expect((emailSenderService as any).validateInstance()).toBe(true);

      emailSenderService.setEmailApi(undefined as unknown as EmailApi);
      expect((emailSenderService as any).validateInstance()).toBe(false);
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
      await expect(() => emailSenderService.sendEmail(options)).rejects.toThrow(
        expect.objectContaining({
          status: 503,
        })
      );
    });

    it("should send an email correctly if emailApi is set", async () => {
      const emailApi = new MockmailerAdapter();
      emailSenderService.setEmailApi(emailApi);

      const sendEmailOutput: SendEmailOutput = {
        to: options.to,
        status: "success",
      };
      mockSendEmail.mockResolvedValueOnce(sendEmailOutput);

      const result = await emailSenderService.sendEmail(options);
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
      expect(mockSendEmail).toHaveBeenCalledWith(options);
      expect(result).toEqual(sendEmailOutput);
    });
  });
});
