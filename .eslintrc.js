 module.exports={
    root: true,
    env: {
        node: true
    },
    extends:[
        'plugin:vue/essential',
        '@vue/typescript/recommended',
        'eslint:recommended',
        'prettier',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint'
    ],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'linebreak-style': 'off',
        'no-console': process. env. NODE_ENV == 'production' ? 'warn' : 'off',
        'no-debugger': process. env. NODE_ENV ='production' ? 'warn' : 'off',
        '@typescript-eslint-/no-non-nul-assert-':'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        "@typescript-eslint/explicit-module-boundary-types": "off",
        '@typescript-eslint/member-delimiter-style': [
            2,
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false
                },
                singleline:{
                    requireLast: false
                }
            }
        ],
        'comma-dangle': 'off',
        'no-unused-vars': 'off',
        'no-undef':'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none'
            }
        ]
    }
}
