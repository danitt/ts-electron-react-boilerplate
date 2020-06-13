/* eslint-disable @typescript-eslint/no-var-requires */
const { jsWithTs: tsjPreset } = require('ts-jest/presets');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsconfig = require('tsconfig');
const { config } = tsconfig.loadSync(__dirname);

const jestConfig = {
  roots: ['<rootDir>/src'],
  testRegex: '.+\\.spec\\.(tsx?)$',
  transform: tsjPreset.transform,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  setupFiles: ['core-js', '<rootDir>/test/utils/configure.ts'],
  moduleNameMapper: {
    // TS Paths
    ...pathsToModuleNameMapper(config.compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
    // Mock electron environment
    electron: '<rootDir>/test/mocks/electron.mock.js',
    // Mock Statics / Externals
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mocks/file.mock.js',
    '\\.(css|less)$': '<rootDir>/test/mocks/style.mock.js',
  },
};

module.exports = jestConfig;
