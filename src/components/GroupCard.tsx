import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { GroupCardProps } from '../types/types';

const GroupCard = ({ groupName, isOpen, onPress, backgroundImage }: GroupCardProps) => {
  const onRequest = ()=>{
    Alert.alert("You need to request to Join Group")
  }

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{uri:backgroundImage}}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay}>
    {isOpen ? <TouchableOpacity onPress={onPress}>
        <Text style={styles.groupName}>{groupName}</Text>
        <Text style={styles.statusText}>
        </Text>
    </TouchableOpacity>:  <TouchableOpacity onPress={onRequest}>
        <Text style={styles.groupName}>{groupName}</Text>
        <Text style={styles.statusText}>
          Request to Join
        </Text>
    </TouchableOpacity>  }    
   
        </View>
      </ImageBackground>
      </View>
    
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)', // darken bottom for text visibility
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  groupName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});

export default GroupCard;
