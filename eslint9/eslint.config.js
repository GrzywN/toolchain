import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: [
      "js/recommended",
      // `plugin:@typescript-eslint/eslint-recommended`,
      "plugin:sonarjs/recommended",
      "plugin:unicorn/recommended",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2026,
    },
    rules: {
      "array-callback-return": "error",
      "constructor-super": "error",
      "for-direction": "error",
      "getter-return": ["error", { allowImplicit: false }],
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": ["error", "except-parens"],
      "no-const-assign": "error",
      "no-constant-binary-expression": "error",
      "no-constant-condition": ["error", { checkLoops: "allExceptWhileTrue" }],
      "no-constructor-return": "off",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "off",                                                                                       // "no-switch-statements/no-switch"
      "no-duplicate-imports": "off",
      "no-empty-character-class": "error",
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: false }],
      "no-ex-assign": "error",
      "no-fallthrough": "off",                                                                                          // "no-switch-statements/no-switch"
      "no-func-assign": "error",
      "no-import-assign": "error",
      "no-inner-declarations": "off",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": ["error", {
        skipComments: false,
        skipJSXText: false,
        skipRegExps: false,
        skipStrings: true,
        skipTemplates: false,
      }],
      "no-loss-of-precision": "error",
      "no-misleading-character-class": ["error", { allowEscape: false }],
      "no-new-native-nonconstructor": "error",
      "no-obj-calls": "error",
      "no-promise-executor-return": "off",
      "no-prototype-builtins": "error",
      "no-self-assign": ["error", { props: true }],
      "no-self-compare": "off",
      "no-setter-return": "error",
      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "off",
      "no-this-before-super": "error",
      "no-unassigned-vars": "off",
      "no-undef": ["error", { typeof: false }],
      "no-unexpected-multiline": "error",
      "no-unmodified-loop-condition": "off",
      "no-unreachable": "error",
      "no-unreachable-loop": "off",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": ["error", { enforceForOrderingRelations: false }],
      "no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: false }],
      "no-unused-private-class-members": "error",
      "no-unused-vars": "warn",
      "no-use-before-define": "off",
      "no-useless-assignment": "off",
      "no-useless-backreference": "error",
      "require-atomic-updates": "off",
      "use-isnan": ["error", { enforceForIndexOf: false, enforceForSwitchCase: true }],
      "valid-typeof": ["error", { requireStringLiterals: false }],

      // ── Suggestions ───────────────────────────────────────────────────────
      "accessor-pairs": "off",
      "arrow-body-style": "always",
      "block-scoped-var": "error",
      "camelcase": ["always", { ignoreDestructuring: false, ignoreImports: false, ignoreGlobals: false }],
      "capitalized-comments": [
        "error",
        "always",
        {
          "ignoreInlineComments": false,
          "ignoreConsecutiveComments": false,
        }
      ],
      "class-methods-use-this": "error",                                                                                // Static methods are more performant
      "complexity": ["error", { "max": 20, "variant": "modified" }],                                                    // LoB > SRP - ignore or refactor when needed
      "consistent-return": "off",                                                                                       // Verbosity when it comes to control flow is more important than being smart
      "consistent-this": "off",                                                                                         // Modern codebase - error on `prefer-arrow-callback` and `no-invalid-this` instead
      "curly": "error",                                                                                                 // Inline control statements are unreadable and harder to add things to it even simple console.log
      "default-case": "off",                                                                                            // "no-switch-statements/no-switch"
      "default-case-last": "off",                                                                                       // "no-switch-statements/no-switch"
      "default-param-last": "error",
      "dot-notation": "error",                                                                                          // Prefer .field over ["field"], ignore if needed
      "eqeqeq": ["error", "smart", { "null": "ignore" }],                                                               // Prefer triple equals and more verbose assignments, use assert-based programming when needed
      "func-name-matching": ["error", "always"],                                                                        // Easier debugging - prefer arrow functions
      "func-names": ["error", "as-needed"],
      "func-style": ["error", "declaration", { "allowArrowFunctions": true }],                                          // Prefer hoisting and reading like a book, use arrow functions for callbacks and inside function declarations
      "grouped-accessor-pairs": ["error", "getBeforeSet"],                                                              // First you retrieve the data and then you set it (functional-inspired approach and alphabettically inspired)
      "guard-for-in": "off",                                                                                            // Healthy practice - make sure property is present
      "id-denylist": [
        "error",                                                                                                        // -> dataFetchingException (domain-driven exception name or type of exception e.g. http, io, streaming, database) 
        "data",                                                                                                         // -> name based on contents (e.g. user, productList, authToken)
        "obj",                                                                                                          // -> object / anything better
        "val",                                                                                                          // -> value / anything better
        "res",                                                                                                          // -> response (or type of response productsResponse)
        "req",                                                                                                          // -> request (or type of request getProductsRequest)
        "err",                                                                                                          // -> ioError (domain-driven exception name or type of exception e.g. http, io, streaming, database)
        "e",                                                                                                            // -> ioError (domain-driven exception name or type of exception e.g. http, io, streaming, database and stored elements in the variable)
        "ex",                                                                                                           // -> dataFetchingException (domain-driven exception name or type of exception e.g. http, io, streaming, database)
        "str",                                                                                                          // -> name what's inside the string, don't lock the variable to the type (string)
        "num",                                                                                                          // -> prefer meaningful names or one letter names for math expressions
        "arr",                                                                                                          // -> name variable based on array contents or type, don't lock the variable to the type (array)
        "buf",                                                                                                          // -> buffer (or content of the binary stored in the buffer), don't lock the variable to the type (buffer)
        "cb",                                                                                                           // -> name function properly, don't lock the variable to the type (function)
        "fn",                                                                                                           // -> name function properly, don't lock the variable to the type (function)
        "func",                                                                                                         // -> name function properly, don't lock the variable to the type (function)
        "curr",                                                                                                         // -> current
        "prev",                                                                                                         // -> previous
        "idx",                                                                                                          // -> index
      ],
      "id-length": [
        "error",
        {
          "min": 3,
          "max": 40,
          "exceptions": ["a", "b", "c", "d", "i", "j", "k", "x", "y", "z", "_", "id"],                                  // Allow math expressions, for iterations, ids and unused temporary variables
          "exceptionPatterns": ["^_"],
          "properties": "never"                                                                                         // Always might be painful when integrating with the APIs 
        }
      ],
      "id-match": ["error", "^(?!(str|bool|int|arr|obj|num)[A-Z])"],                                                    // Forbid Hungarian Notation
      "init-declarations": "off",
      "logical-assignment-operators": ["error", "always"],
      "max-classes-per-file": [
        "error",
        { "ignoreExpressions": true, "max": 1 }
      ],
      "max-depth": ["warn", 3],
      "max-lines": ["warn", { "max": 500, "skipBlankLines": true, "skipComments": true }], // WIP
      "max-lines-per-function": "off",                                                                                  // Sometimes you want to keep everything in one function e.g. scripts/ or proof of concepts
      "max-nested-callbacks": ["error", 3],
      "max-params": ["warn", 10],                                                                                       // Prefer passing an object with options/configuration for such cases
      "max-statements": "off",
      "new-cap": "error",
      "no-alert": "warn",                                                                                               // It's accessible and quick solution at the early stages of the app development
      "no-array-constructor": "error",
      "no-bitwise": "warn",                                                                                             // Ignore single line, if bitwise was used for algorithmic speed optimization
      "no-caller": "error",
      "no-case-declarations": "off",                                                                                    // "no-switch-statements/no-switch"
      "no-console": ["warn", { allow: ["warn", "error"] }],                                                             // Report to Sentry or use specialized logged e.g. winston
      "no-continue": "error",                                                                                           // Not sure why would you use it, reframe your algorithm
      "no-delete-var": "error",                                                                                         // Prefer immutable operations
      "no-div-regex": "error",
      "no-else-return": "error",                                                                                        // Prefer early returns and single if statements
      "no-empty": ["error", { allowEmptyCatch: true }], // ENDED HERE
      "no-empty-function": "off",
      "no-empty-static-block": "error",
      "no-eq-null": "off",
      "no-eval": "off",
      "no-extend-native": "off",
      "no-extra-bind": "off",
      "no-extra-boolean-cast": "error",
      "no-extra-label": "off",
      "no-global-assign": ["error", { exceptions: [] }],
      "no-implicit-coercion": "off",
      "no-implicit-globals": "off",
      "no-implied-eval": "off",
      "no-inline-comments": "off",
      "no-invalid-this": "off",
      "no-iterator": "off",
      "no-label-var": "off",
      "no-labels": "off",
      "no-lone-blocks": "off",
      "no-lonely-if": "off",
      "no-loop-func": "off",
      "no-magic-numbers": "off",
      "no-multi-assign": "off",
      "no-multi-str": "off",
      "no-negated-condition": "off",
      "no-nested-ternary": "off",
      "no-new": "off",
      "no-new-func": "off",
      "no-new-wrappers": "off",
      "no-nonoctal-decimal-escape": "error",
      "no-object-constructor": "off",
      "no-octal": "error",
      "no-octal-escape": "off",
      "no-param-reassign": "off",
      "no-plusplus": "off",
      "no-proto": "off",
      "no-redeclare": ["error", { builtinGlobals: true }],
      "no-regex-spaces": "error",
      "no-restricted-exports": "off",
      "no-restricted-globals": "off",
      "no-restricted-imports": "off",
      "no-restricted-properties": "off",
      "no-restricted-syntax": "off",
      "no-return-assign": "off",
      "no-script-url": "off",
      "no-sequences": "off",
      "no-shadow": "off",
      "no-shadow-restricted-names": ["error", { reportGlobalThis: false }],
      "no-ternary": "off",
      "no-throw-literal": "off",
      "no-undef-init": "off",
      "no-undefined": "off",
      "no-underscore-dangle": "off",
      "no-unneeded-ternary": "off",
      "no-unused-expressions": "off",
      "no-unused-labels": "error",
      "no-useless-call": "off",
      "no-useless-catch": "error",
      "no-useless-computed-key": "off",
      "no-useless-concat": "off",
      "no-useless-constructor": "off",
      "no-useless-escape": ["error", { allowRegexCharacters: [] }],
      "no-useless-rename": "off",
      "no-useless-return": "off",
      "no-var": "off",
      "no-void": "off",
      "no-warning-comments": "off",
      "no-with": "error",
      "object-shorthand": "off",
      "one-var": "off",
      "operator-assignment": "off",
      "prefer-arrow-callback": "error",                                                                                 // Prefer for function declarations for top-level functions and arrow for callbacks
      "prefer-const": "error",
      "prefer-destructuring": "off",
      "prefer-exponentiation-operator": "off",
      "prefer-named-capture-group": "off",
      "prefer-numeric-literals": "off",
      "prefer-object-has-own": "off",
      "prefer-object-spread": "off",
      "prefer-promise-reject-errors": "off",
      "prefer-regex-literals": "off",
      "prefer-rest-params": "off",
      "prefer-spread": "off",
      "prefer-template": "off",
      "preserve-caught-error": "off",
      "radix": "off",
      "require-await": "off",
      "require-unicode-regexp": "off",
      "require-yield": "error",
      "sort-imports": "off",
      "sort-keys": "off",
      "sort-vars": "off",
      "strict": "off",
      "symbol-description": "off",
      "vars-on-top": "off",
      "yoda": "off",

      // ── Layout & Formatting ───────────────────────────────────────────────
      "unicode-bom": "off",

      // eslint-plugin-no-switch-statements
      "no-switch-statements/no-switch": "error",
    },
  },
]);
