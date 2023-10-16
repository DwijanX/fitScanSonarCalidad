const config = {
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}", 
    "!<rootDir>/node_modules/",
    "!**/*.config.js",
  ],
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  preset: "jest-expo",
  testEnvironment: "jsdom", // Set the test environment to jsdom

  moduleNameMapper: {
    "\\.(ttf)$": "<rootDir>/test/__mocks__/fileMock.js", // Replace with the path to your mock file
  },
};

module.exports = config;
