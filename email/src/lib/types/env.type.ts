import z from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production", "staging"]),
  PORT: z.string().min(2),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().min(2),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
