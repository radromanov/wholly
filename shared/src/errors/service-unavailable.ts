import {
  SERVICE_UNAVAILABLE_MESSAGE,
  SERVICE_UNAVAILABLE_STATUS,
} from "../constants";
import { BaseError } from "../core";

export default class ServiceUnavailable extends BaseError {
  constructor(message = SERVICE_UNAVAILABLE_MESSAGE) {
    super(message, SERVICE_UNAVAILABLE_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ServiceUnavailable.prototype);
  }
}
