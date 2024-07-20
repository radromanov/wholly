import { BAD_REQUEST_MESSAGE, BAD_REQUEST_STATUS } from "../constants";
import { BaseError } from "../core";

export default class BadRequest extends BaseError {
  constructor(message = BAD_REQUEST_MESSAGE) {
    super(message, BAD_REQUEST_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}
