export { };
module.exports = {
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
        '!**/vendor/**'],
    testEnvironment: 'jsdom',
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
}