import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../constants";
import { BaseError } from "../core";

export default class InternalServerError extends BaseError {
  constructor(message = INTERNAL_SERVER_ERROR_MESSAGE) {
    super(message, INTERNAL_SERVER_ERROR_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
