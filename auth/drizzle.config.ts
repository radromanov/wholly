import { authConfig } from "./src/lib/utils";
import { defineConfig } from "drizzle-kit";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = authConfig.get();
const url = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_NAME}`;

export default defineConfig({
  schema: "./src/lib/utils/db-schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
  verbose: true,
  strict: true,
});
