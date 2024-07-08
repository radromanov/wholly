import { maximum, minimum, required } from "@shared/utils";
import z from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    email: z.string(required("Email")).email(),
    firstName: z
      .string(required("First name"))
      .min(2, minimum("First name", 2))
      .max(64, maximum("First name", 64)),
    lastName: z
      .string(required("Last name"))
      .min(2, minimum("Last name", 2))
      .max(64, maximum("Last name", 64)),
  }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>["body"];
