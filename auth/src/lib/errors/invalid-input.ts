import { BaseError } from "@shared/core";
import {
  INVALID_INPUT_MESSAGE_DEFAULT,
  UNPROCESSABLE_ENTITY_STATUS,
} from "@lib/constants";

export class InvalidInput extends BaseError {
  constructor(message = INVALID_INPUT_MESSAGE_DEFAULT) {
    super(message, UNPROCESSABLE_ENTITY_STATUS);
  }
}
