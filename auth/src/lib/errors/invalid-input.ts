import { BaseError } from "@shared/core";
import {
  INVALID_INPUT_MESSAGE,
  UNPROCESSABLE_ENTITY_STATUS,
} from "@lib/constants";

export class InvalidInput extends BaseError {
  constructor(message = INVALID_INPUT_MESSAGE) {
    super(message, UNPROCESSABLE_ENTITY_STATUS);

    Object.setPrototypeOf(this, InvalidInput.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
