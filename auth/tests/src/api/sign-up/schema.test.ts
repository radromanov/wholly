import { SignupSchema } from "@api/sign-up";

describe("Sign up Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs: { email: any; description: string }[] = [
      { email: "testemail", description: "has no email domain" },
      { email: "testemail@email", description: "has no email domain" },
      { email: "testemail@.com", description: "has no email domain" },
      { email: 123, description: "is a number" },
      { email: true, description: "is a boolean" },
      { email: {}, description: "is an object" },
      { email: undefined, description: "is undefined" },
      { email: null, description: "is null" },
    ];

    invalidInputs.forEach(({ email, description }) => {
      it(`should fail to parse if ${description}`, () => {
        const invalid = SignupSchema.safeParse({ body: { email } });

        expect(invalid.success).toBe(false);
      });
    });
  });
  describe("Valid Inputs", () => {
    const validInputs: { email: string; description: string }[] = [
      {
        email: "test@email.com",
        description: "is a string and has an email domain",
      },
      {
        email: "test@EMAIL.COM",
        description: "is a string and has an email domain",
      },
      {
        email: "t@EMAIL.COM",
        description: "is a string and has an email domain",
      },
    ];

    validInputs.forEach(({ email, description }) => {
      it(`should successfully parse if ${description}`, () => {
        const valid = SignupSchema.safeParse({ body: { email } });

        expect(valid.success).toBe(true);
      });
    });
  });
});
