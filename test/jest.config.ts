import { pathsToModuleNameMapper } from 'ts-jest';
const tsconfig = require('./tsconfig.json');
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.entity.ts',
    '!src/test/**',
  ],
  coverageDirectory: './coverage',
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: '<rootDir>/',
    },
  ),
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  // Add this for better performance
  maxWorkers: 1, // limit to 1 test workers
  testTimeout: 30000, // Increase timeout for slower CI environments
};

export default config;
