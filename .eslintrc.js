module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
      'plugin:prettier/recommended',
      'plugin:eslint-plugin-json/recommended',
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: ['prettier'],
    "rules": {
      'prettier/prettier': 'error',
    },
};
