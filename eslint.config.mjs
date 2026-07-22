import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...love.rules,
      '@typescript-eslint/no-magic-numbers': 'off',
      'require-unicode-regexp': 'off'
    }
  }
]
