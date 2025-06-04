import React from 'react'
import { Pressable, StyleSheet, Text, StyleProp, ViewStyle, TextStyle, Dimensions} from 'react-native'


const {width: deviceWidth, height: deviceheight} = Dimensions.get('window')
  const hp = (percentage: number) =>{
    return (percentage*deviceheight)/ 100;
}
const wp = (percentage: number) =>{
    return (percentage*deviceWidth)/ 100;
}

interface ButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
}

const CustomButton = ({
    buttonStyle,
    textStyle,
    title ='',
    onPress=()=>{},
    loading = false,
    hasShadow = true

}:ButtonProps) => {
  
  const shadowStyle = {

  }
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
         button: {
          backgroundColor: "#032554",
          height: hp(6.6),
          justifyContent: 'center',
          alignItems: 'center',
          borderCurve: 'continuous',
          borderRadius: 18
         }, 
         text:{
           fontSize: hp(2.5),
           color: 'white',
           fontWeight: 'bold'
         }

})
export default CustomButton