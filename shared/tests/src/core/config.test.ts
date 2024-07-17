import z from "zod";
import { Config } from "../../../src/core";

describe("Config", () => {
  const PORT = "4444";
  const NODE_ENV = "testing";
  const schema = z.object({
    PORT: z.string().min(2),
    NODE_ENV: z.enum(["testing"]),
  });

  let config: Config<any>;

  describe("Valid Configuration", () => {
    beforeAll(() => {
      process.env = {
        PORT,
        NODE_ENV,
      };
      config = new Config(schema);
    });

    it("should correctly get a key from process.env", () => {
      const port = config.get("PORT");

      expect(port).toEqual(PORT);
    });

    it("should correct get multiple keys from process.env", () => {
      const keys = config.get();

      expect(keys).toHaveProperty("PORT");
      expect(keys).toHaveProperty("NODE_ENV");

      expect(keys.PORT).toEqual(PORT);
      expect(keys.NODE_ENV).toEqual(NODE_ENV);
    });
  });

  describe("Invalid Configuration", () => {
    beforeEach(() => {
      config = new Config(schema);
    });

    it("should throw an error due to missing key", () => {
      process.env = {
        POR: "4444",
        NODE_ENV: "testing",
      };
      expect(() => config.get()).toThrow();
    });

    it("should throw an error due to invalid key", () => {
      process.env = {
        PORT: "4",
        NODE_ENV: "testing",
      };
      expect(() => config.get()).toThrow();
    });
  });
});
