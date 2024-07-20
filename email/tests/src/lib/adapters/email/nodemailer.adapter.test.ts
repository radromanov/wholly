import { NodemailerAdapter } from "@lib/adapters";

describe("Nodemailer Adapter", () => {
  let nodemailerAdapter: NodemailerAdapter;

  beforeAll(() => {
    nodemailerAdapter = new NodemailerAdapter();
  });

  describe("Method Validation", () => {
    const availableMethods = ["sendEmail"];

    availableMethods.forEach((method) => {
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
});
