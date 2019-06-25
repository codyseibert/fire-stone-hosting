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
    'extends': [
        'eslint:recommended', 
        'plugin:prettier/recommended', 
        'plugin:react/recommended', 
        'prettier/react', 
        'prettier/standard',
    ],
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
        'react',
        'prettier'
    ],
    'rules': {
        'react/prop-types': [0],
        'prettier/prettier': 'error',
        "react/jsx-indent-props": [2, 2],
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