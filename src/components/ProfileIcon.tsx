import React, { useEffect, useState } from 'react';
import { TouchableOpacity,  StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileIconProps, NavigationProp } from '../types/types';
import { useGlobalContext } from '../contexts/GlobalContext';



export default function ProfileIcon({userId}: ProfileIconProps) {
  const navigation = useNavigation<NavigationProp>();
  const {state} = useGlobalContext();
  const [userProfilePic, setUserProfilePic] = useState<any| undefined>('')
  const handlePress = () => {
    navigation.navigate('ViewProfile', { userId: userId });
  };
  useEffect(()=>{
    loadPicture()
  }, [])

  const loadPicture = () => {
  const profile = state.allProfiles?.find(p => p.id === userId);
  if (profile?.id == userId) {
    setUserProfilePic(profile?.avatar_url);
  }
};


  return (
    <>
    { userId === state.currentUserId ?  <TouchableOpacity>
      <Image source={{ uri: userProfilePic }} style={styles.avatar} />
    </TouchableOpacity>: <TouchableOpacity onPress={handlePress}>
      <Image source={{ uri: userProfilePic }} style={styles.avatar} />
    </TouchableOpacity>
    }
    </>
   
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
