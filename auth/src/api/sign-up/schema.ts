import z from "zod";
import { ZOD_EMAIL_DEFAULT, ZOD_NOT_NULL_STRING_DEFAULT } from "@lib/utils/zod";
import {
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
} from "@lib/constants";

export const SignupSchema = z.object({
  body: z.object({
    email: ZOD_EMAIL_DEFAULT,
    firstName: ZOD_NOT_NULL_STRING_DEFAULT("First Name", {
      min: FIRST_NAME_MIN_LENGTH,
      max: FIRST_NAME_MAX_LENGTH,
    }),
    lastName: ZOD_NOT_NULL_STRING_DEFAULT("Last Name", {
      min: LAST_NAME_MIN_LENGTH,
      max: LAST_NAME_MAX_LENGTH,
    }),
  }),
});

export type SignupInput = z.infer<typeof SignupSchema>["body"];
