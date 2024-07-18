import { sql } from "@lib/utils";
import { Database } from "@shared/core";

describe("Database Connection", () => {
  let instance: Database;

  beforeAll(() => {
    instance = Database.getInstance();
  });

  afterAll(async () => {
    await instance.close();
  });

  it("should return a sample query", async () => {
    const result = await sql`SELECT 1+1 AS RESULT`;

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("result");
    expect(result[0]?.result).toBe(2);
  });
});
