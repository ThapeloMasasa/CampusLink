import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Post from './Post';
import { post } from '../types/types';

const PostsTab = ({ posts }: { posts: post[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ Header: '', image: '' });
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const renderPostItem = ({ item }: { item: post }) => (
    <View style={styles.gridItem}>
      <Post
        title={item.Header}
        content={item.Header}
        image={item.image ? { uri: item.image } : undefined}
        likes={item.likes ?? 0}
        reactions={item.reactions ?? []}
        mypost={true}
        userId={item.id}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
      />

      {/* ➕ Add Post Button */}
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addButtonLabel}>New Post</Text>
      </TouchableOpacity>

      {/* 📝 Add Post Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Post</Text>
            <TextInput
              placeholder="Header"
              value={newPost.Header}
              onChangeText={(text) => setNewPost({ ...newPost, Header: text })}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Enter your post content..."
              style={styles.contentInput}
              multiline
            />

            <Text style={styles.inputLabel}>Image</Text>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Upload Image</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            )}

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  gridItem: {
    flex: 1,
    paddingHorizontal: 8,
    margin: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 6,
  },
  addButtonLabel: {
    fontSize: 10,
    color: '#fff',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputLabel: {
    marginTop: 10,
    fontWeight: '600',
  },
  contentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    textAlignVertical: 'top',
    height: 100,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'gray',
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default PostsTab;
