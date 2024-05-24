// eslint.config.js
import js from "@eslint/js";
import reactRecommended from "eslint-config-react/recommended";
import prettierRecommended from "eslint-config-prettier/recommended";

export default [
  js.configs.recommended,
  reactRecommended,
  prettierRecommended,
  {
    env: {
      browser: true,
      es2021: true,
      jest: true
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      sourceType: "module"
    },
    rules: {
      "consistent-return": "error",
      eqeqeq: "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
