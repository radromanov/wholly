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
});
