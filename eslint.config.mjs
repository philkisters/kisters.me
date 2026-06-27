import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['.nuxt/**', '.output/**', 'node_modules/**', 'html/**', 'public/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: [
      'app/**/*.vue',
      'app/**/*.{js,mjs,cjs,ts,mts,cts}',
      'content.config.{js,mjs,cjs,ts,mts,cts}',
      'nuxt.config.{js,mjs,cjs,ts,mts,cts}',
      'eslint.config.{js,mjs,cjs,ts,mts,cts}',
    ],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/multi-word-component-names': 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
    },
  },
  eslintConfigPrettier,
]
