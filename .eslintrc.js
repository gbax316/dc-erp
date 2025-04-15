module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    "coverage/"
  ]
}; 