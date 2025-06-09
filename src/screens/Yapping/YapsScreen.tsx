import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../supabaseClient';
import { useGlobalContext } from '../../contexts/GlobalContext';
import YapCard from '../../components/YapCard';
import { YapType } from '../../types/types';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

const YapsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [yapText, setYapText] = useState('');
  const [posted, setPosted] = useState(false);
  const [yapTitle, setYapTitle] = useState('');
  const [addImage, setAddImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [yaps, setYaps] = useState<YapType[] | null>([]);
  const { state } = useGlobalContext();

  useEffect(() => {
    LoadContent();
  }, [posted]);

  const LoadContent = () => {
    try {
      const yapsdata = state.allYaps || null;
      setYaps(yapsdata);
    } catch (e) {
      console.log("error");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePostYap = async () => {
  if (!yapTitle.trim() || !yapText.trim()) return;

  let imageUrl = null;

  try {
    if (addImage && selectedImage) {
      const fileName = `yap_${Date.now()}.jpg`;

      const base64 = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { error: storageError } = await supabase.storage
        .from('posts')
        .upload(fileName, Buffer.from(base64, 'base64'), {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (storageError) {
        console.error('Image upload error:', storageError);
        Alert.alert('Image upload failed');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('posts')
        .getPublicUrl(fileName);

      imageUrl = urlData?.publicUrl;
    }

    const { data, error } = await supabase
      .from('Yaps')
      .insert([{
        header: yapTitle,
        Content: yapText,
        yap: 'yap',
        likes: 0,
        reactions: [],
        score: 0,
        has_image: !!imageUrl,
        image: imageUrl,
        created_at: new Date().toISOString(),
        owner: state.currentUserId,
      }])
      .select()
      .single();

    if (error) {
      console.error("Insert Error:", error);
      return;
    }

    setYaps([data, ...(yaps || [])]);
  } catch (e) {
    console.error("Post Yap Error:", e);
  } finally {
    setYapTitle('');
    setYapText('');
    setPosted(!posted);
    setAddImage(false);
    setSelectedImage(null);
    setModalVisible(false);
  }
};


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        {yaps?.map((yap, index) => (
          <View style={styles.eachYap} key={index}>
            <YapCard
              content={yap.Content}
              likes={42}
              imageUrl={yap.image}
              onLike={() => console.log('Liked')}
              onDislike={() => console.log('Disliked')}
              commentCount={7}
              hasImage = {yap.has_image}
              timestamp={yap.created_at}
              distance=""
            />
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.add}>🗣️Add Yap🗣️</Text>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>New Yap</Text>

            <TextInput
              style={styles.input}
              placeholder="Title..."
              value={yapTitle}
              onChangeText={setYapTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Type your yap..."
              value={yapText}
              onChangeText={setYapText}
              multiline
            />

            <TouchableOpacity
              style={styles.imageToggle}
              onPress={() => {
                if (!addImage) pickImage();
                setAddImage(!addImage);
              }}
            >
              <Ionicons
                name={addImage ? "checkbox" : "square-outline"}
                size={24}
                color="#180bc6"
              />
              <Text style={styles.imageToggleText}> Add Image</Text>
            </TouchableOpacity>

            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postButton} onPress={handlePostYap}>
                <Text style={styles.postButtonText}>Post Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  eachYap: {
  width: '100%',
},
  add: { position: 'absolute', bottom: 25, right: 5, fontWeight: 'bold', fontSize: 17 },
  separator: { height: 4, backgroundColor: '#8a1616f8', width: '100%' },
  fab: {
    position: 'absolute',
    bottom: 55,
    right: 27,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 10,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%', borderRadius: 5, marginBottom: 15,
  },
  imageToggle: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
  },
  imageToggleText: {
    marginLeft: 8, fontSize: 16,
  },
  previewImage: {
    width: '100%', height: 180, borderRadius: 10, marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FF3B30', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, flex: 1, marginRight: 10,
  },
  postButton: {
    backgroundColor: '#180bc6', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, flex: 1, marginLeft: 10,
  },
  cancelButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  postButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default YapsScreen;
