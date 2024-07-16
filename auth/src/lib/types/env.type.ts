import z from "zod";

export const envSchema = z.object({
  PORT: z.string().min(2),
});

export type EnvSchema = z.infer<typeof envSchema>;
