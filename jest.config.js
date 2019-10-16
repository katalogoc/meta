module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
            diagnostics: {
                warnOnly: true
            }
        },
    },
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}