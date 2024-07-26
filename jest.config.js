export default {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testPathIgnorePatterns: [
    'src/App.tsx',
    'src/main.tsx',
    'src/router/index.tsx',
  ],
  coveragePathIgnorePatterns: [
    'src/App.tsx',
    'src/main.tsx',
    'src/router/index.tsx',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
};
