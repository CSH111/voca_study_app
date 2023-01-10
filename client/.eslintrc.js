module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "1",
    "simple-import-sort/exports": "1",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "no-unused-vars": 1,
  },
};
