module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/path/to/your/jest-setup.js"],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom/index.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
