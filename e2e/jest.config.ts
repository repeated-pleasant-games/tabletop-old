import type { Config } from "@jest/types";

const config: Config.InitialOptions =
{
  verbose: true,
  testEnvironment: "node",
  rootDir: "./",
  transform: {
    "\\.tsx?$": "ts-jest",
  },
};

export default config;