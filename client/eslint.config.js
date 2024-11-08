import { ESLint } from "eslint";
import eslintRecommended from "eslint:recommended";
import pluginReactRecommended from "plugin:react/recommended";
import pluginReactJsxRuntime from "plugin:react/jsx-runtime";
import pluginReactHooksRecommended from "plugin:react-hooks/recommended";
import reactRefresh from "react-refresh";

const config = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    eslintRecommended,
    pluginReactRecommended,
    pluginReactJsxRuntime,
    pluginReactHooksRecommended,
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.2",
    },
  },
  plugins: [reactRefresh],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
  },
};

export default config;
