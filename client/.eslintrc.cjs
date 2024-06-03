module.exports = {
  env: { browser: true, es2020: true ,Node:true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  globals: {
    process: true,
    require: true,
  },
  plugins: ['react-refresh'],
  rules: {
    'no-undef': 'error',
    // Other configurations
  },
}
