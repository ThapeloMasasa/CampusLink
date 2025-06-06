import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, ActivityIndicator, Text,
  TouchableOpacity, Modal, TextInput, StyleSheet
} from 'react-native';
import { Video } from 'expo-av';
import { supabase } from '../../supabaseClient';
import { useGlobalContext } from '../contexts/GlobalContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { Ionicons } from '@expo/vector-icons';
import VideoScene from './VideoScene';

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

const ScenesTab = () => {
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newScene, setNewScene] = useState({ caption: '' });
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const { state } = useGlobalContext();
  let countScenes = Math.floor(Math.random() * 1000000000);

  const fetchScenes = async () => {
    const { data, error } = await supabase
      .from('Scenes')
      .select('*')
      .eq('owner', state.currentUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching scenes:', error.message);
    } else {
      setScenes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScenes();
  }, []);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const uploadVideoToSupabase = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `${state.currentUserId}/scene-${Date.now()}.mp4`;
      const contentType = 'video/mp4';

      const { error } = await supabase.storage
        .from('posts')
        .upload(fileName, Buffer.from(base64, 'base64'), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error('Error uploading video:', error.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      return publicUrlData?.publicUrl ?? null;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const handleCreateScene = async () => {
    if (!videoUri) return;

    const uploadedUrl = await uploadVideoToSupabase(videoUri);
    if (!uploadedUrl) return;

    const scenePayload = {
      id: countScenes,
      videoUri: uploadedUrl,
      caption: newScene.caption,
      likes: 0,
      comments: {},
      shares: 0,
      owner: state.currentUserId,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('Scenes').insert(scenePayload);

    if (error) {
      console.error('Error saving scene:', error.message);
    } else {
      setModalVisible(false);
      setNewScene({ caption: '' });
      setVideoUri(null);
      fetchScenes();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {scenes.length > 0 ? (
          scenes.map((scene, index) => (
            <VideoScene
              key={index}
              videoUri={scene.videoUri}
              likes={scene.likes}
              comments={scene.comments}
              shares={scene.shares}
            />
          ))
        ) : (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text>No scenes available.</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addButtonLabel}>New Scene</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Scene</Text>

            <TextInput
              placeholder="Caption"
              value={newScene.caption}
              onChangeText={(text) => setNewScene({ ...newScene, caption: text })}
              style={styles.input}
            />

            <TouchableOpacity onPress={pickVideo} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Upload Video</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateScene} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Create Scene</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'gray',
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ScenesTab;
