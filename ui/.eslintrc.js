module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        node: true,
    },
    settings: {
        react: {
            version: '16.8.6',
        },
    },
    'extends': ['eslint:recommended','plugin:react/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 9,
        'jsx': true,
        'sourceType': 'module',
    },
    'plugins': [
        'react'
    ],
    'rules': {
        "react/jsx-indent-props": [2, 2],
        'indent': [
            'error',
            2
        ],
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