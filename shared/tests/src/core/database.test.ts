import { config } from "dotenv";
import path from "path";
import { Database } from "../../../src/core/database";

config({
  path: path.resolve(
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : process.env.NODE_DEV === "development"
      ? ".env.development"
      : ".env.testing"
  ),
});

describe("Database connection", () => {
  let db: Database;
  beforeAll(async () => {
    db = Database.getInstance();

    await db.createDatabase("test-db");
  });

  afterAll(async () => {
    await db.dropDatabase("test-db");
    await db.close();
  });

  it("should connect to the database and return a query", async () => {
    const sql = db.sql();
    const result = (await sql`SELECT 1 +1 AS RESULT`) as { result: number }[];

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("result");
    expect(result[0]?.result).toBe(2);
  });
});
