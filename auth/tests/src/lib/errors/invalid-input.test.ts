import {
  INVALID_INPUT_MESSAGE,
  UNPROCESSABLE_ENTITY_STATUS,
} from "@lib/constants";
import { InvalidInput } from "@lib/errors";
import { BaseError } from "@shared/core";

describe("lib/errors/invalid-input", () => {
  it("should be an instance of BaseError and InvalidInput", () => {
    const invalidInputError = new InvalidInput();

    expect(invalidInputError).toBeInstanceOf(BaseError);
    expect(invalidInputError).toBeInstanceOf(InvalidInput);
  });

  it("should have the default message and status properties", () => {
    const invalidInputError = new InvalidInput();

    expect(invalidInputError.message).toEqual(INVALID_INPUT_MESSAGE);
    expect(invalidInputError.status).toEqual(UNPROCESSABLE_ENTITY_STATUS);
  });
});
