import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { AvatarProps } from '../types/types';

const Avatar: React.FC<AvatarProps> = ({ uri, size, rounded }) => {
  return (
    <Image
      source={ uri }
      style={[styles.avatar,{
        width: size,
        height: size,
        borderRadius: rounded,
      }]}
    />
  );
};

const styles = StyleSheet.create({
    avatar: {
        borderCurve: 'continuous',
        borderColor: '#E1E1E1',
        borderWidth: 1
    }
})

export default Avatar;
