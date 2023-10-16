const config = {
  collectCoverageFrom: ["app/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/"],
  verbose: true,
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  preset: "jest-expo",
  moduleNameMapper: {
    "\\.(ttf)$": "<rootDir>/test/__mocks__/fileMock.js", // Replace with the path to your mock file
  },
};

module.exports = config;
