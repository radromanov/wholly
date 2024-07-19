import "@shared/utils/dotenv";
import { envSchema } from "@lib/types";
import { Config } from "@shared/core";

export const emailConfig = new Config(envSchema);
