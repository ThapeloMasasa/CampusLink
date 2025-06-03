import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for call immediately calls the callback which is incorrect
  // So we override it to be a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence useNativeDriver warning
//jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
