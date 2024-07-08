import { minimum, required } from "@shared/utils";
import z from "zod";

export class GatewayServiceConfig {
  private schema = z.object({
    host: z
      .string(required("WHOLLY_GATEWAY_HOST"))
      .min(7, minimum("WHOLLY_GATEWAY_HOST", 7)),
    port: z
      .string(required("WHOLLY_GATEWAY_PORT"))
      .min(2, minimum("WHOLLY_GATEWAY_PORT", 2))
      .transform((val) => parseInt(val, 10)),
    url: z
      .string(required("WHOLLY_GATEWAY_URL"))
      .min(7, minimum("WHOLLY_GATEWAY_URL", 7)),
    env: z.enum(
      ["development", "production", "staging", "testing"],
      required("NODE_ENV")
    ),
  });

  get(key?: never): ReturnType<typeof this.schema.parse>;
  get<T extends keyof ReturnType<typeof this.schema.parse>>(
    key: T
  ): ReturnType<typeof this.schema.parse>[T];
  get<T extends keyof ReturnType<typeof this.schema.parse>>(key?: T) {
    try {
      const env = this.schema.parse({
        host: process.env.WHOLLY_GATEWAY_HOST,
        port: process.env.WHOLLY_GATEWAY_PORT,
        url: process.env.WHOLLY_GATEWAY_URL,
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
