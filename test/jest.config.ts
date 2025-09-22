import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from '.tsconfig.json';
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
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: '<rootDir>/',
    },
  ),
  maxWorkers: 1, // limit to 1 test workers
};

export default config;
