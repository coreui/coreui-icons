/**
 * Copyright (c) 2013-present, creativeLabs Lukasz Holeczek.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['dist/'],
  transform: {
    '.*\\.(js)$': 'ts-jest',
    '.*\\.(tsx)$': 'ts-jest',
  },
}
