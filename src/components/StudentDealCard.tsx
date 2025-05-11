import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable,  Modal, Button,ScrollView, SafeAreaView  } from 'react-native';
import { StudentDealCardProps } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileIcon from './ProfileIcon';

const StudentDealCard: React.FC<StudentDealCardProps> = ({ image, price,message }) => {
  
      const [modalVisible, setModalVisible] = useState(false)

  
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.productImage} resizeMode="cover" />

      <View style={styles.bottomRow}>
      <ProfileIcon  userId='Masasa'/>

        <Pressable style={styles.dealButton} onPress={()=>setModalVisible(true)}>
          <Text style={styles.dealText}>Deal</Text>
        </Pressable>

        <Text style={styles.priceTag}>${price}</Text>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <SafeAreaView style={styles.modalOverlay}>
    <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>📌 Deal Instructions</Text>
      <Text style={styles.modalMessage}>
  {message}
</Text>

<View style={styles.modalActions}>
  <Pressable onPress={() => console.log('Email')}>
    <Icon name="envelope" size={28} color="#555" />
  </Pressable>

  <ProfileIcon  userId='Masasa'/>

  <Pressable onPress={() => console.log('Message')}>
    <Icon name="comment" size={28} color="#555" />
  </Pressable>
</View>
      <Button title="Done" onPress={() => setModalVisible(false)} />
    </View>
  </SafeAreaView>
</Modal>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    width: '75%',
    aspectRatio: 0.8, // Makes card height dynamic to width for portrait shape
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '4%',
    margin: '2.5%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
    marginLeft: '13%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginBottom: 16,
    marginTop: 12,
  },
  
  productImage: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  dealButton: {
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: '2%',
    paddingHorizontal: '8%',
    borderRadius: 20,
    marginTop: '3%',
  },
  dealText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4%',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  priceTag: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    height: '45%', 
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 10,
  },
  
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  
  modalMessage: {
    paddingTop: 45,
    fontSize: 25,
    textAlign: 'center',
    color: '#555',
    lineHeight: 35,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  

});

export default StudentDealCard;
