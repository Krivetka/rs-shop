module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.*?.json"],
        createDefaultProgram: true,
      },
      extends: ["airbnb-typescript/base"],
      rules: {
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/lines-between-class-members": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off",

        "max-len": ["error", { code: 140 }],
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "lines-between-class-members": "off",
        "prefer-destructuring": "off",
        "no-param-reassign": 0,
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },
  ],
};
