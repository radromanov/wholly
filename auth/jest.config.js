/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/utils/drizzle.mock.ts"],
  moduleNameMapper: {
    "^@core(.*)$": "<rootDir>/src/core$1",
    "^@api(.*)$": "<rootDir>/src/api$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@shared(.*)$": "<rootDir>/../shared/src$1",
  },
};
