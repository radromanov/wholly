import { NodemailerAdapter } from "@lib/adapters";
import { SendEmailInput } from "@lib/types";

describe("Nodemailer Adapter", () => {
  describe("Method Validation", () => {
    const availableMethods = ["sendEmail"];

    availableMethods.forEach((method) => {
      const nodemailerAdapter = new NodemailerAdapter();
      it(`should have ${method} method`, () => {
        expect(nodemailerAdapter).toHaveProperty(method);
      });
    });
  });

  describe("Environment", () => {
    it("should correctly initialize in production environment", () => {
      process.env.NODE_ENV = "production";
      const nodemailerAdapter = new NodemailerAdapter();

      expect(nodemailerAdapter["isSandbox"]).toBe(false);
    });

    it("should correctly initialize in development environment", () => {
      process.env.NODE_ENV = "development";
      const nodemailerAdapter = new NodemailerAdapter();

      expect(nodemailerAdapter["isSandbox"]).toBe(true);
    });

    it("should correctly initialize in test environment", () => {
      const nodemailerAdapter = new NodemailerAdapter();

      expect(nodemailerAdapter["isSandbox"]).toBe(true);
    });
  });

  describe("sendEmail method", () => {
    let options: SendEmailInput;

    beforeAll(() => {
      options = {
        to: "test@email.com",
        from: "noreply-test@wholly.com",
        subject: "Test Email",
        text: "This is a test email",
      };
    });

    it("should send email in development environment", async () => {
      process.env.NODE_ENV = "development";
      const nodemailerAdapter = new NodemailerAdapter();

      const response = await nodemailerAdapter.sendEmail(options);

      expect(nodemailerAdapter["isSandbox"]).toBe(true);
      expect(response).toEqual({ to: options.to, status: "success" });
    });

    it("should send an email preview in production environment", async () => {
      process.env.NODE_ENV = "production";
      const nodemailerAdapter = new NodemailerAdapter();

      const response = await nodemailerAdapter.sendEmail(options);

      expect(nodemailerAdapter["isSandbox"]).toBe(false);
      expect(response).toEqual({ to: options.to, status: "success" });
    });

    it("should send an email preview in test environment", async () => {
      process.env.NODE_ENV = "test";
      const nodemailerAdapter = new NodemailerAdapter();

      const response = await nodemailerAdapter.sendEmail(options);

      expect(nodemailerAdapter["isSandbox"]).toBe(true);
      expect(response).toEqual({ to: options.to, status: "success" });
    });
  });
});
