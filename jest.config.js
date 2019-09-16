process.env.NODE_ENV = 'test';
const {
  defaults: tsjPreset
} = require('ts-jest/presets');

module.exports = {
  transform: {
    ...tsjPreset.transform
  },
  verbose: true,
  preset: 'ts-jest',
  // globals: {
  //   'ts-jest': {
  //     tsConfig: 'tsconfig.jest.json'
  //   }
  // },
  testEnvironment: 'node',
  testMatch: ["**/__tests__/?(*.)+(tests).ts"]
}