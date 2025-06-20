import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Button,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { StudentDealCardProps } from '../types/types';

import ProfileIcon from './ProfileIcon';
import { useGlobalContext } from '../contexts/GlobalContext';
import { supabase } from '../../supabaseClient';

const StudentDealCard: React.FC<StudentDealCardProps> = ({ image, price, instructions, userId, place }) => {
  const { state } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState(instructions);
  const [editedPrice, setEditedPrice] = useState(String(price));

  const isCurrentUser = userId === state.currentUserId;

  const handleSave = async () => {
    const priceNum = parseFloat(editedPrice);
    if (isNaN(priceNum) || priceNum < 0) {
      Alert.alert('Invalid Price', 'Please enter a valid non-negative number for price.');
      return;
    }
    try {
      const { error } = await supabase
        .from('Deals')
        .update({ instructions: editedInstructions, price: priceNum })
        .eq('owner', userId);
      if (error) {
        Alert.alert('Update Failed', error.message);
        return;
      }

      Alert.alert('Success', 'Deal updated successfully!');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating the deal.');
    }
  };

  const handleCancel = () => {
    setEditedInstructions(instructions);
    setEditedPrice(String(price));
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      {place === 'home' && (
        <View style={styles.homeHeaderContainer}>
          <Text style={styles.homeHeaderText}>💸 Student Sale 💸</Text>
        </View>
      )}

      <Image source={image} style={styles.productImage} resizeMode="cover" />

      <View style={styles.bottomRow}>
        {!isCurrentUser && <ProfileIcon userId={userId} />}

        <Pressable style={styles.dealButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.dealText}>{isCurrentUser ? 'Instructions' : 'See Details'}</Text>
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

              {isCurrentUser ? (
                <>
                  <TextInput
                    style={styles.instructionsInput}
                    multiline
                    value={editedInstructions}
                    onChangeText={setEditedInstructions}
                    placeholder="Enter instructions"
                  />
                  <View style={styles.price}>
                    <Text style={styles.priceText}>Price</Text>
                    <TextInput
                      style={styles.priceInput}
                      keyboardType="numeric"
                      value={editedPrice}
                      onChangeText={setEditedPrice}
                      placeholder="Price"
                      maxLength={10}
                    />
                  </View>

                  <View style={styles.modalButtonsRow}>
                    <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                      <Text style={styles.modalButtonText}>Save</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.modalMessage}>{instructions}</Text>
                  <Button title="Done" onPress={() => setModalVisible(false)} />
                </>
              )}
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    aspectRatio: 0.8,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: '2.5%',
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },

  homeHeaderContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },

  homeHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },

  productImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 4,
  },

  dealButton: {
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },

  dealText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  price: {
    flexDirection: 'row',
    paddingRight: 10,
  },

  priceText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 7,
    paddingRight: 10,
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

  instructionsInput: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'top',
    marginBottom: 12,
    maxHeight: 100,
  },

  priceInput: {
    width: 80,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#bbb',
  },

  saveButton: {
    backgroundColor: '#3B82F6',
  },

  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default StudentDealCard;
