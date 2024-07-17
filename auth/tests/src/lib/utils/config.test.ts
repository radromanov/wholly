import { authConfig } from "@lib/utils";

describe("lib/utils/config", () => {
  it("should have the correct environment variables", () => {
    const keys = authConfig.get();

    Object.keys(keys).forEach((key) => {
      const val = authConfig.get(key as keyof typeof keys);
      expect(process.env[key]).toEqual(val);
    });
  });
});
