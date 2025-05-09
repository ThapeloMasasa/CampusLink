import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { EmojiPickerProps } from '../types/types';

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose, visible }) => {
  const emojis = ['😂', '👍', '🔥', '❤️', '🎉', '😭'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.emojiContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => onSelect(emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emojiContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    emoji: {
      fontSize: 30,
      margin: 10,
    },
    closeButton: {
      marginTop: 20,
      color: 'red',
      fontWeight: 'bold',
    },
  });
