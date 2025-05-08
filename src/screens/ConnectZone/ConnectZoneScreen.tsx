import React from 'react';
import SectionScreen from './SectionScreen';
import ConnectChatRoom from './ConnectChatRoom';
import { View } from 'react-native';

const ConnectZoneScreen = () => {
  return (
    <>
    <View>
      <SectionScreen />
    </View>
    <View>
      <ConnectChatRoom />
    </View>
    </>
  )
}

export default ConnectZoneScreen