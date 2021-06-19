import type { Config } from "@jest/types";

const config: Config.InitialOptions =
{
  verbose: true,
  testEnvironment: "jsdom",
  rootDir: "./",
  transform: {
    "\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>$1",
  },
};

export default config;