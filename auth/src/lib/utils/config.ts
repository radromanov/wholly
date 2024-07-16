import "./dotenv";
import { envSchema } from "@lib/types";
import { Config } from "@shared/core";

export const authConfig = new Config(envSchema);
