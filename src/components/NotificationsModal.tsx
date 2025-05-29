import React from 'react';
import { Modal, View, Text, Pressable, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

const notifications = [
  { id: '1', message: 'John liked your post.' },
  { id: '2', message: 'New message from Sarah.' },
  { id: '3', message: 'Your story was viewed 20 times.' },
];

interface NotificationsModalComponentProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationsModalComponent({
  visible,
  onClose,
}: NotificationsModalComponentProps) {

  return (
  <Modal
  animationType="fade"
  transparent
  visible={visible}
  onRequestClose={onClose} // necessary for Android back button
>
  <View style={styles.backdrop}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={StyleSheet.absoluteFillObject} />
    </TouchableWithoutFeedback>

    <View style={styles.modalContainer}>
      {/* Your modal content */}
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Text style={{ color: '#fff' }}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>



  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // margin around modal
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: 650,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  notificationItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
