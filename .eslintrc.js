module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parser': 'babel-eslint',
  'parserOptions': {
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
  'rules': {
    'global-require': 'off',
    "jsx-a11y/href-no-hash": [ 0, [ "Link", "Anchor" ] ], // issue with the packages
  }
};