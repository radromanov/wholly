import { config } from "dotenv";
import path from "path";

export const conf = config({
  path: path.resolve(
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development"
  ),
});
