const config = {
    "collectCoverageFrom": [
        "app/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/"
      ],
    verbose: true,
    "preset": "react-native",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
  };
  
module.exports = config;