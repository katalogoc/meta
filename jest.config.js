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
    testMatch: [
        "<rootDir>/tests/**/*.test.ts"
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}