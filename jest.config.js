module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
            diagnostics: {
                warnOnly: true
            }
        },
    },
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}