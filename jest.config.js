module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|expo|@expo|expo-modules-core|@expo/vector-icons|@unimodules|expo-.*|react-native-.*)/)',
  ],
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
