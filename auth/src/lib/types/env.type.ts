import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test", "staging"]),
  PORT: z.string().min(2),
  POSTGRES_NAME: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;
