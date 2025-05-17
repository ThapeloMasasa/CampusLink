import React from 'react'
import { View, Text, Image, Button, StyleSheet, Linking,
  Alert, Platform } from 'react-native'
import { localDeal } from '../types/types'

const LocalDealsCard = ({ store, storeLogo, image, price }: localDeal) => {

const openDoorDash = async () => {
  const urlScheme = 'doordash://';
  const appStoreURL = Platform.select({
  ios: 'https://apps.apple.com/us/app/doordash-food-delivery/id719972451',
  android: 'https://play.google.com/store/apps/details?id=com.dd.doordash',
}) ?? 'https://doordash.com';

  const supported = await Linking.canOpenURL(urlScheme);
  if (supported) {
    Linking.openURL(urlScheme);
  } else {
    Linking.openURL(appStoreURL);
  }
};

const openUberEats = async () => {
  const urlScheme = 'uber-eats://';
  const uberEatsURL = Platform.select({
  ios: 'https://apps.apple.com/us/app/uber-eats-food-delivery/id1058959277',
  android: 'https://play.google.com/store/apps/details?id=com.ubercab.eats',
}) ?? 'https://www.ubereats.com'; // Fallback to website

  const supported = await Linking.canOpenURL(urlScheme);
  if (supported) {
    Linking.openURL(urlScheme);
  } else {
    Linking.openURL(uberEatsURL);
  }
};


    return (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Image source={storeLogo} style={styles.logo} />
            <Text style={styles.restaurantName}>{store}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          
          <Image source={image} style={styles.dealImage} />
    
          

          <View style={styles.buttonContainer}>
            <Button title="UberEats" onPress={openUberEats} />
            <Button title="DoorDash" onPress={openDoorDash} />
          </View>
        </View>
      )
}
const styles = StyleSheet.create({
    card: {
      width: '90%',
      margin: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      padding: 10,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dealImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginVertical: 10,
    },
    price: {
      position: 'absolute',
      right: 3,
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
  export default LocalDealsCard