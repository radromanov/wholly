import z from "zod";
import { ZOD_EMAIL_DEFAULT, ZOD_NOT_NULL_STRING_DEFAULT } from "@shared/utils";
import {
  SEND_EMAIL_SUBJECT_MAX_LENGTH,
  SEND_EMAIL_SUBJECT_MIN_LENGTH,
  SEND_EMAIL_TEXT_MAX_LENGTH,
  SEND_EMAIL_TEXT_MIN_LENGTH,
} from "@lib/constants";

export const SendEmailInputSchema = z.object({
  body: z.object({
    from: ZOD_EMAIL_DEFAULT,
    to: ZOD_EMAIL_DEFAULT,
    subject: ZOD_NOT_NULL_STRING_DEFAULT("Subject", {
      min: SEND_EMAIL_SUBJECT_MIN_LENGTH,
      max: SEND_EMAIL_SUBJECT_MAX_LENGTH,
    }),
    text: ZOD_NOT_NULL_STRING_DEFAULT("Text", {
      min: SEND_EMAIL_TEXT_MIN_LENGTH,
      max: SEND_EMAIL_TEXT_MAX_LENGTH,
    }),
  }),
});
export const SendEmailOutputSchema = z.object({
  body: z.object({
    to: ZOD_EMAIL_DEFAULT,
    text: ZOD_NOT_NULL_STRING_DEFAULT("Text", {
      min: SEND_EMAIL_TEXT_MIN_LENGTH,
      max: SEND_EMAIL_TEXT_MAX_LENGTH,
    }),
    status: z.enum(["success", "fail"]),
  }),
});

export type SendEmailInput = z.infer<typeof SendEmailInputSchema>["body"];
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>["body"];
