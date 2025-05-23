import React from 'react';
import { TouchableOpacity,  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileIconProps, NavigationProp } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function ProfileIcon({ userId}: ProfileIconProps) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('ViewProfile', { userId: userId });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon name="user-circle" size={40} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
