module.exports = {
    transform: {"^.+\\.tsx?$": "ts-jest"},
    testEnvironment: "node",
    testRegex: "/tests/.*\\.test\\.tsx?$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      "^~(.*)$": "<rootDir>/src$1"
    }
}