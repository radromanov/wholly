import { Database } from "@shared/core";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./db-schema";

export const sql = Database.getInstance().sql();
export const db = drizzle(sql, { schema });
