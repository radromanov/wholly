import {
  UNPROCESSABLE_ENTITY_MESSAGE,
  UNPROCESSABLE_ENTITY_STATUS,
} from "../constants";
import { BaseError } from "../core";

export default class UnprocessableEntity extends BaseError {
  constructor(message = UNPROCESSABLE_ENTITY_MESSAGE) {
    super(message, UNPROCESSABLE_ENTITY_STATUS);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, UnprocessableEntity.prototype);
  }
}
