/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@core(.*)$": "<rootDir>/src/core$1",
    "^@api(.*)$": "<rootDir>/src/api$1",
  },
};
