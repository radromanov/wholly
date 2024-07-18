import { SignupSchema } from "@api/sign-up";
import {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
} from "@lib/constants";

describe("Sign up Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs: {
      email: any;
      firstName: any;
      lastName: any;
      description: string;
    }[] = [
      {
        email: "testemail",
        firstName: "Test",
        lastName: "Last",
        description: "'email' has no email domain",
      },
      {
        email: "testemail@email",
        firstName: "Test",
        lastName: "Last",
        description: "'email' has no email domain",
      },
      {
        email: "testemail@.com",
        firstName: "Test",
        lastName: "Last",
        description: "'email' has no email domain",
      },
      {
        email: 123,
        firstName: "Test",
        lastName: "Last",
        description: "'email' is a number",
      },
      {
        email: true,
        firstName: "Test",
        lastName: "Last",
        description: "'email' is a boolean",
      },
      {
        email: {},
        firstName: "Test",
        lastName: "Last",
        description: "'email' is an object",
      },
      {
        email: undefined,
        firstName: "Test",
        lastName: "Last",
        description: "'email' is undefined",
      },
      {
        email: null,
        firstName: "Test",
        lastName: "Last",
        description: "'email' is null",
      },
      {
        email: "test@email.com",
        firstName: 123,
        lastName: "Last",
        description: "'firstName' is a number",
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: 123,
        description: "'lastName' is a number",
      },
      {
        email: "test@email.com",
        firstName: true,
        lastName: "Last",
        description: "'firstName' is a boolean",
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: true,
        description: "'lastName' is a boolean",
      },
      {
        email: "test@email.com",
        firstName: {},
        lastName: "Last",
        description: "'firstName' is an object",
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: {},
        description: "'lastName' is an object",
      },
      {
        email: "test@email.com",
        firstName: undefined,
        lastName: "Last",
        description: "'firstName' is missing",
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: undefined,
        description: "'lastName' is missing",
      },
      {
        email: "test@email.com",
        firstName: null,
        lastName: "Last",
        description: "'firstName' is missing",
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: null,
        description: "'lastName' is missing",
      },
      {
        email: "test@email.com",
        firstName: "T",
        lastName: "Last",
        description: `'firstName' is less than ${FIRST_NAME_MIN_LENGTH} character(s)`,
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: "L",
        description: `'lastName' is less than ${LAST_NAME_MIN_LENGTH} character(s)`,
      },
      {
        email: "test@email.com",
        firstName: "ThisIsAStringThatExceedsThirtyTwoCharacters",
        lastName: "Last",
        description: `'firstName' exceeds ${FIRST_NAME_MAX_LENGTH} character(s)`,
      },
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: "ThisIsAStringThatExceedsThirtyTwoCharacters",
        description: `'lastName' exceeds ${LAST_NAME_MAX_LENGTH} character(s)`,
      },
    ];

    invalidInputs.forEach(({ email, firstName, lastName, description }) => {
      it(`should fail to parse if ${description}`, () => {
        const invalid = SignupSchema.safeParse({
          body: { email, firstName, lastName },
        });

        expect(invalid.success).toBe(false);
      });
    });
  });
  describe("Valid Inputs", () => {
    const validInputs: {
      email: string;
      firstName: string;
      lastName: string;
      description: string;
    }[] = [
      {
        email: "test@email.com",
        firstName: "Test",
        lastName: "Last",
        description:
          "'email', 'firstName', and 'lastName' are strings and 'email' has an email domain",
      },
      {
        email: "test@EMAIL.COM",
        firstName: "Test",
        lastName: "LA",
        description: `'email' is a valid string that has an email domain; 'firstName' and 'lastName' are valid strings between ${FIRST_NAME_MIN_LENGTH}-${FIRST_NAME_MAX_LENGTH} and ${LAST_NAME_MIN_LENGTH}-${LAST_NAME_MIN_LENGTH} character(s) respectively`,
      },
      {
        email: "t@EMAIL.COM",
        firstName: "TE",
        lastName: "Last",
        description: `'email' is a valid string that has an email domain; 'firstName' and 'lastName' are valid strings between ${FIRST_NAME_MIN_LENGTH}-${FIRST_NAME_MAX_LENGTH} and ${LAST_NAME_MIN_LENGTH}-${LAST_NAME_MAX_LENGTH} character(s) respectively`,
      },
    ];

    validInputs.forEach(({ email, firstName, lastName, description }) => {
      it(`should successfully parse if ${description}`, () => {
        const valid = SignupSchema.safeParse({
          body: { email, firstName, lastName },
        });

        expect(valid.success).toBe(true);
      });
    });
  });
});
