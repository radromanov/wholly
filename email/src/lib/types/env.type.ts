import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production", "staging"]),
  PORT: z.string().min(2),
  NODEMAILER_HOST: z.string(),
  NODEMAILER_PORT: z.string().min(2),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
});
