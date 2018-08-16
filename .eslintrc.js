module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        'no-console': 'off',
        "no-undef": 'off',
        "no-unused-vars":'off',
    }
};