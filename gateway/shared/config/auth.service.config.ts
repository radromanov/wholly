import { minimum, required } from "@shared/utils";
import z from "zod";

export class AuthServiceConfig {
  private schema = z.object({
    host: z
      .string(required("WHOLLY_AUTH_SERVICE_HOST"))
      .min(7, minimum("WHOLLY_AUTH_SERVICE_HOST", 7)),
    port: z
      .string(required("WHOLLY_AUTH_SERVICE_PORT"))
      .min(2, minimum("WHOLLY_AUTH_SERVICE_PORT", 2))
      .transform((val) => parseInt(val, 10)),
    url: z
      .string(required("WHOLLY_AUTH_SERVICE_URL"))
      .min(7, minimum("WHOLLY_AUTH_SERVICE_URL", 7)),
    env: z.enum(
      ["development", "production", "staging", "testing"],
      required("NODE_ENV")
    ),
    dbHost: z
      .string(required("WHOLLY_AUTH_SERVICE_DB_HOST"))
      .min(1, minimum("WHOLLY_AUTH_SERVICE_DB_HOST")),
    dbPort: z
      .string(required("WHOLLY_AUTH_SERVICE_DB_PORT"))
      .min(2, minimum("WHOLLY_AUTH_SERVICE_DB_PORT", 2))
      .transform((val) => parseInt(val, 10)),
    dbUser: z
      .string(required("WHOLLY_AUTH_SERVICE_DB_USER"))
      .min(1, minimum("WHOLLY_AUTH_SERVICE_DB_USER")),
    dbPass: z
      .string(required("WHOLLY_AUTH_SERVICE_DB_PASS"))
      .min(1, minimum("WHOLLY_AUTH_SERVICE_DB_PASS")),
    dbName: z
      .string(required("WHOLLY_AUTH_SERVICE_DB_NAME"))
      .min(1, minimum("WHOLLY_AUTH_SERVICE_DB_NAME")),
    dbUrl: z
      .string(required("Wholly database URL"))
      .min(7, minimum("Wholly database URL", 7)),
    event: z.object({
      USER_REGISTER: z.string().readonly(),
      USER_LOGIN: z.string().readonly(),
      USER_LOGOUT: z.string().readonly(),
    } as const),
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
        dbHost: process.env.WHOLLY_AUTH_SERVICE_DB_HOST,
        dbPort: process.env.WHOLLY_AUTH_SERVICE_DB_PORT,
        dbUser: process.env.WHOLLY_AUTH_SERVICE_DB_USER,
        dbPass: process.env.WHOLLY_AUTH_SERVICE_DB_PASS,
        dbName: process.env.WHOLLY_AUTH_SERVICE_DB_NAME,
        dbUrl: `postgres://${process.env.WHOLLY_AUTH_SERVICE_DB_USER}:${process.env.WHOLLY_AUTH_SERVICE_DB_PASS}@${process.env.WHOLLY_AUTH_SERVICE_DB_HOST}:${process.env.WHOLLY_AUTH_SERVICE_DB_PORT}/${process.env.WHOLLY_AUTH_SERVICE_DB_NAME}`,
        event: {
          USER_REGISTER: "USER_REGISTER" as const,
          USER_LOGIN: "USER_LOGIN" as const,
          USER_LOGOUT: "USER_LOGOUT" as const,
        } as const,
      });

      if (key) return env[key];
      else return env;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error - could not init auth service");
    }
  }
}
