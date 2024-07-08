import "@shared/utils/dotenv";
import z from "zod";

export class AuthServiceConfig {
  private schema = z.object({
    host: z
      .string({
        required_error:
          "'WHOLLY_AUTH_SERVICE_HOST' environment variable is required",
      })
      .min(
        7,
        "'WHOLLY_AUTH_SERVICE_HOST' environment variable must be at least 7 character(s)"
      ),
    port: z
      .string({
        required_error:
          "'WHOLLY_AUTH_SERVICE_PORT' environment variable is required",
      })
      .min(
        2,
        "'WHOLLY_AUTH_SERVICE_PORT' environment variable must be at least 2 character(s)"
      )
      .transform((val) => parseInt(val, 10)),
    url: z
      .string({
        required_error:
          "'WHOLLY_AUTH_SERVICE_URL' environment variable is required",
      })
      .min(
        7,
        "'WHOLLY_AUTH_SERVICE_URL' environment variable must be at least 7 character(s)"
      ),
    env: z.enum(["development", "production", "staging", "testing"], {
      required_error: "'NODE_ENV' environment variable is required",
    }),
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
        url: process.env.WHOLLY_AUTH_SERVICE_URL,
        env: process.env.NODE_ENV,
      });

      if (key) return env[key];
      else return env;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error - could not init auth service");
    }
  }
}
