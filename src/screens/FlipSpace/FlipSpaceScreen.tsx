import React from 'react'
import LocalDealsScreen from './Local Deals/LocalDealsScreen'
import StudentDealsScreen from './Student Deals/StudentDealsScreen'
import { View } from 'react-native'

const FlipSpaceScreen = () => {
  return (
    <>
    <View>
        <LocalDealsScreen />
      </View>
      <View>
        <StudentDealsScreen />
    </View>
    </>
  )
}

export default FlipSpaceScreen