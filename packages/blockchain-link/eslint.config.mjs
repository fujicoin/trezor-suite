import { eslint, globalNoExtraneousDependenciesDevDependencies } from '@trezor/eslint';

export default [
    ...eslint,
    {
        rules: {
            camelcase: 'off',
            'no-underscore-dangle': 'off',
            'no-console': 'warn',
            'import/no-default-export': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: [
                        ...globalNoExtraneousDependenciesDevDependencies,
                        '**/tests/**',
                        '**/webpack/**',
                    ],
                },
            ],
        },
    },
];
