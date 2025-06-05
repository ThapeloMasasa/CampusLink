import React, { useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import { Buffer } from 'buffer';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Video, ResizeMode} from 'expo-av';
import PostCard from './PostCard';
import { post } from '../types/types';
import { supabase } from '../../supabaseClient';
import { useGlobalContext } from '../contexts/GlobalContext';

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

const PostsTab = ({ posts }: { posts: post[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [newPost, setNewPost] = useState({ Header: '', image: '' });
  const { state } = useGlobalContext();
  let countPosts = Math.floor(Math.random() * 1000000000);
  const scrollY = useRef(new Animated.Value(0)).current;
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const type = result.assets[0].type as 'image' | 'video';
      setMediaUri(uri);
      setMediaType(type);
    }
  };

  const uploadMediaToSupabase = async (uri: string, type: 'image' | 'video') => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const extension = type === 'image' ? 'jpg' : 'mp4';
      const fileName = `${state.currentUserId}/post-${Date.now()}.${extension}`;
      const contentType = type === 'image' ? 'image/jpeg' : 'video/mp4';

      const { error } = await supabase.storage
        .from('posts')
        .upload(fileName, Buffer.from(base64, 'base64'), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error('Upload error:', error.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage.from('posts').getPublicUrl(fileName);
      return publicUrlData?.publicUrl ?? null;
    } catch (err) {
      console.error('Upload failed:', err);
      return null;
    }
  };
  const detectMediaType = (uri: string): 'image' | 'video' | 'unknown' => {
  const extension = uri.split('.').pop()?.toLowerCase();

  if (!extension) return 'unknown';

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];

  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';

  return 'unknown';
};

  const handleCreatePost = async () => {
    let mediaUrl = '';
countPosts += 1;

if (mediaUri) {
  const detectedType = detectMediaType(mediaUri); // this is the one to trust

  if (detectedType === 'image' || detectedType === 'video') {
    const uploadedUrl = await uploadMediaToSupabase(mediaUri, detectedType);
    if (uploadedUrl) {
      mediaUrl = uploadedUrl;

      const postPayload = {
        Header: newPost.Header,
        id: countPosts,
        image: mediaUrl,
        created_at: new Date().toISOString(),
        reactions: [],
        mediaType: detectedType, 
        yap: false,
        owner: state.currentUserId,
        likes: 0,
      };

      const { error } = await supabase.from('Posts').insert(postPayload);
      if (error) console.error('Error saving post:', error.message);
      else {
        console.log('Post saved!');
        setModalVisible(false);
        setNewPost({ Header: '', image: '' });
        setContent('');
        setMediaUri(null);
        setMediaType(null);
      }
    }
  } else {
    console.warn('Unsupported media type detected.');
  }
}
  };

  const renderPostItem = ({ item }: { item: post }) => (
    <View style={styles.gridItem}>
      <PostCard
        title={item.Header}
        scrollY={scrollY}
        mediaType={item.mediaType}
        content={item.Header}
        image={item.image ? { uri: item.image } : undefined}
        likes={item.likes ?? 0}
        reactions={item.reactions ?? []}
        mypost={true}
        userId={item.owner}
        createdAt={item.created_at}
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

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addButtonLabel}>New Post</Text>
      </TouchableOpacity>

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

            <Text style={styles.inputLabel}>Media</Text>
            <TouchableOpacity onPress={pickMedia} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Upload Image or Video</Text>
            </TouchableOpacity>

            {mediaUri && mediaType === 'image' && (
              <Image source={{ uri: mediaUri }} style={styles.previewImage} />
            )}

            {mediaUri && mediaType === 'video' && (
              <Video
                source={{ uri: mediaUri }}
                style={styles.previewImage}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay={true} // autoplay with sound
                isMuted={false}  
              />
            )}

            <TouchableOpacity onPress={handleCreatePost} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Post</Text>
            </TouchableOpacity>

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
