import { NOT_IMPLEMENTED_MESSAGE, NOT_IMPLEMENTED_STATUS } from "../constants";
import { BaseError } from "../core";

export class NotImplemented extends BaseError {
  constructor(message = NOT_IMPLEMENTED_MESSAGE) {
    super(message, NOT_IMPLEMENTED_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotImplemented.prototype);
  }
}
