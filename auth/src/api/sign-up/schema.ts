import z from "zod";
import { ZOD_EMAIL_DEFAULT } from "@lib/utils/zod";

export const SignupSchema = z.object({
  body: z.object({
    email: ZOD_EMAIL_DEFAULT,
  }),
});

export type SignupInput = z.infer<typeof SignupSchema>["body"];
