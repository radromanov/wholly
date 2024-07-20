import "@shared/utils/dotenv";
import { EnvSchema } from "@lib/types";
import { Config } from "@shared/core";

export const emailConfig = new Config(EnvSchema);
