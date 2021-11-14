module.exports = {
  'env': {
      'browser': false,
      'es6': true,
      node: true,
  },
  'extends': [
      'eslint:recommended', 
      'plugin:prettier/recommended', 
      'prettier/standard',
  ],
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
      'ecmaVersion': 9,
      'jsx': false,
      'sourceType': 'module',
  },
  'plugins': [
      'prettier'
  ],
  'rules': {
      'prettier/prettier': 'error',
      'linebreak-style': [
          'error',
          'unix'
      ],
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'always'
      ]
  }
};