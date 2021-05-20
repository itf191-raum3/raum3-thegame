import type {Config} from '@jest/types';

const {defaults} = require("jest-config");

const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  verbose: true,
  testMatch: [
    "**/test/*Test.ts"
  ]
};
export default config;