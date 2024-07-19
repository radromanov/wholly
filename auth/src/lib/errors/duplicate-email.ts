import { BaseError } from "@shared/core";
import { DUPLICATE_EMAIL_MESSAGE, CONFLICT_STATUS } from "@lib/constants";

export class DuplicateEmail extends BaseError {
  constructor(message = DUPLICATE_EMAIL_MESSAGE) {
    super(message, CONFLICT_STATUS);

    Object.setPrototypeOf(this, DuplicateEmail.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
