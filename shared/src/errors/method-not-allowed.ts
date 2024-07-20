import {
  METHOD_NOT_ALLOWED_MESSAGE,
  METHOD_NOT_ALLOWED_STATUS,
} from "../constants";
import { BaseError } from "../core";

export default class MethodNotAllowed extends BaseError {
  constructor(message = METHOD_NOT_ALLOWED_MESSAGE) {
    super(message, METHOD_NOT_ALLOWED_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, MethodNotAllowed.prototype);
  }
}
