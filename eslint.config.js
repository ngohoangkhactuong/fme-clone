import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import preferArrow from "eslint-plugin-prefer-arrow";
import prettier from "eslint-plugin-prettier";
import promise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project: ["./tsconfig.app.json", "./tsconfig.node.json"]
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
      import: importPlugin,
      "prefer-arrow": preferArrow,
      prettier,
      "jsx-a11y": jsxA11y,
      promise,
      "@typescript-eslint": ts.plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": ["warn"],
      "no-var": "error",
      "prefer-const": "warn",
      "consistent-return": "error",
      "spaced-comment": ["error", "always", { markers: ["/"] }],
      "arrow-body-style": ["error", "as-needed"],
      "unused-imports/no-unused-imports": "error",
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: true
        }
      ],
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "promise/always-return": "warn",
      "promise/no-return-wrap": "warn",
      "promise/param-names": "warn",
      "promise/catch-or-return": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          caughtErrors: "all",
          ignoreRestSiblings: false
        }
      ]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "*.yml",
      "*.yaml",
      "*.md",
      "dockerfile",
      ".eslintignore",
      ".prettierrc",
      ".prettierignore",
      ".dockerignore",
      "vite-env.d.ts",
      ".yml",
      ".md"
    ]
  }
);
