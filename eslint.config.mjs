import eslintPluginNext from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslintPluginNext(),
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // 👇 Disable rules globally
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    },
  },
];
