import { BaseError } from "../../../src/core";

class MockError extends BaseError {
  constructor(message: string, status: number) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, MockError.prototype);
  }
}

describe("BaseError", () => {
  const message = "Mock Error Message";
  const status = 500;

  it("should be instance of BaseError and MockError", () => {
    const mockError = new MockError(message, status);

    expect(mockError).toBeInstanceOf(BaseError);
    expect(mockError).toBeInstanceOf(MockError);
  });

  it("should set the message and status correctly", () => {
    const mockError = new MockError(message, status);

    expect(mockError.message).toEqual(message);
    expect(mockError.status).toEqual(status);
  });

  it("should set the stack trace correctly in production", () => {
    process.env.NODE_ENV = "production";
    const mockError = new MockError(message, status);

    expect(mockError.trace).toBe(null);
  });

  it("should set the stack trace correct in development", () => {
    process.env.NODE_ENV = "development";
    const mockError = new MockError(message, status);

    expect(mockError.trace).toMatch(/Error/);
  });

  it("should serialize the error correctly", () => {
    const mockError = new MockError(message, status);
    const serialized = mockError.serialize();

    expect(serialized).toEqual({
      message,
      status,
      trace: mockError.trace,
    });
  });
});
