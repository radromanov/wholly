import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "development"
    ? ".env.development"
    : ".env.test"
);

export const conf = config({
  path: envPath,
});
