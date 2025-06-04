import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/types';
import ScreenWrapper from '../../components/ScreenWrapper';
import { StatusBar} from 'react-native';
import CustomButton from '../../components/CustomButton';


const {width: deviceWidth, height: deviceheight} = Dimensions.get('window')
  const hp = (percentage: number) =>{
    return (percentage*deviceheight)/ 100;
}
const wp = (percentage: number) =>{
    return (percentage*deviceWidth)/ 100;
}
const GetStartedScreen = () => {
const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
const handleGettingStarted = ()=>{
    navigation.navigate('SignUp')
}
const handleSignIn = ()=>{
    navigation.navigate('LogIn')
}
  return (
    <ScreenWrapper>
     <StatusBar />
      <TouchableOpacity style = {styles.signin} onPress={handleSignIn}>
                <Text style = {styles.signText} >
                    Sign in 
                </Text>
        </TouchableOpacity>
     <View style= {styles.container}>
       
       
        <Image style = {styles.welcomeImage} resizeMode = "contain"  source= {require('../../../assets/WelcomeIMG.png')} />
         <View style={{gap: 20}}>
            <Text style = {styles.title}>Campus Link</Text>
            <Text style = {styles.motto}>Exclusive Platform for college life</Text>
         </View>
          <View style = {styles.footer}>
        <TouchableOpacity>
            <CustomButton title="Getting Started" textStyle="" buttonStyle={{marginHorizontal: wp(3)}} onPress={handleGettingStarted} />
        </TouchableOpacity>
       
     </View>
     </View>
    
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: wp(4) },
  title: { 
    color: '#494949',
    fontSize:hp(4),
    textAlign: 'center',
    fontWeight: '800',
    fontFamily:'verdana' 
   },
   signText:{
      color: "#032554",
      fontWeight: 'bold',
      fontSize:hp(2),
      fontFamily:'verdana' 
   }
   ,
signin: {
 alignItems: 'flex-end',
 
 paddingRight: 35,
 paddingTop: 25
},
  welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center'
  },
  motto: {
    textAlign: 'center',
    paddingHorizontal:wp(10),
    fontSize: hp(2),
    color: "#494949",
    fontFamily:'verdana' 
  },
  footer:{
    gap: 30,
    width:'100%'
  }
});

export default GetStartedScreen;
