const path = require('path');

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    "ecmaVersion": 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'jsx-a11y',
    'import',
    'react',
  ],
  'extends': [
    'airbnb',
  ],
  'globals': {
    '_': false,
    'autoprefixer': false,
    'path': false
  },
  'root': true,
  'rules': {
    'global-require': 'off',
    "jsx-a11y/href-no-hash": [ 0, [ "Link", "Anchor" ] ], // issue with the packages
  },
  'settings': {
    'import/resolver': {
      webpack: { config: path.resolve(__dirname, 'webpack.config.js') },
    },
  }
};