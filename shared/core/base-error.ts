export abstract class BaseError extends Error {
  status: number;
  trace: string;

  protected constructor(message: string, status: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, BaseError.prototype);

    this.status = status;
    this.trace =
      process.env.NODE_ENV === "production"
        ? "Nothing to see here"
        : this.stack || "Unknown stack trace";
  }

  serialize() {
    return {
      message: this.message,
      status: this.status,
      trace: this.trace,
    };
  }
}
