/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@api(.*)$": "<rootDir>/src/api$1",
    "^@core(.*)$": "<rootDir>/src/core$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@shared(.*)$": "<rootDir>/../shared/src$1",
  },
};
