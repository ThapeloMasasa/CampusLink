import React from 'react'
import { View } from 'react-native';
import YapsLeaderBoard from './YapsLeaderBoard';
import YapsScreen from './YapsScreen';


const YappingScreen = () => {
  return (
    <>
    <View>
        <YapsScreen />
        </View>
    <View>
        <YapsLeaderBoard />
    </View>
    </>
  )
}

export default YappingScreen