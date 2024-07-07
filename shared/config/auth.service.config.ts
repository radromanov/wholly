import z from "zod";

export class AuthServiceConfig {
  private schema = z.object({
    host: z.string().min(1),
    port: z
      .string()
      .min(2)
      .transform((val) => parseInt(val, 10)),
    url: z.string().min(1),
  });

  get(key?: never): ReturnType<typeof this.schema.parse>;
  get<T extends keyof ReturnType<typeof this.schema.parse>>(
    key: T
  ): ReturnType<typeof this.schema.parse>[T];
  get<T extends keyof ReturnType<typeof this.schema.parse>>(key?: T) {
    try {
      const env = this.schema.parse({
        host: process.env.WHOLLY_AUTH_SERVICE_HOST,
        port: process.env.WHOLLY_AUTH_SERVICE_PORT,
        url: `${process.env.WHOLLY_AUTH_SERVICE_HOST}:${process.env.WHOLLY_AUTH_SERVICE_PORT}`,
      });

      if (key) return env[key];
      else return env;
    } catch (error) {
      throw new Error("Internal Server Error - could not init auth service");
    }
  }
}
