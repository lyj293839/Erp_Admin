module.exports = {
  root: false,
  env: {
    node: false
  },
  // 'extends': [
  //   'plugin:vue/essential',
  //   '@vue/standard'
  // ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: "module"
  }
}
