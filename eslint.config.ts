import js from "@eslint/js";
import * as reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["dist/", "node_modules/", "uploads/"],
  },

  // BASE
  js.configs.recommended,

  // ===== CLIENT (React) =====
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { reactPlugin },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
