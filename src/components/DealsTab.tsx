import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, ActivityIndicator, Text,
  TouchableOpacity, Modal, TextInput, Image, StyleSheet
} from 'react-native';
import { supabase } from '../../supabaseClient';
import StudentDealCard from './StudentDealCard';
import { useGlobalContext } from '../contexts/GlobalContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { Ionicons } from '@expo/vector-icons';

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

const DealsTab = () => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useGlobalContext();
  let countDeals = Math.floor(Math.random() * 1000000000);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDeal, setNewDeal] = useState({ price: '', instructions: '' });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const fetchDeals = async () => {
    const { data, error } = await supabase
      .from('Deals')
      .select('*')
      .eq('owner', state.currentUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching deals:', error.message);
    } else {
      setDeals(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToSupabase = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `${state.currentUserId}/deal-${Date.now()}.jpg`;
      const contentType = 'image/jpeg';

      const { error } = await supabase.storage
        .from('deals')
        .upload(fileName, Buffer.from(base64, 'base64'), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error('Error uploading image:', error.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('deals')
        .getPublicUrl(fileName);

      return publicUrlData?.publicUrl ?? null;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const handleCreateDeal = async () => {
    let imageUrl = '';
    countDeals += 1
    if (imageUri) {
      const uploadedUrl = await uploadImageToSupabase(imageUri);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const dealPayload = {
      ...newDeal,
      id: countDeals,
      image: imageUrl,
      yap: 'deal',
      owner: state.currentUserId,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('Deals').insert(dealPayload);

    if (error) {
      console.error('Error saving deal:', error.message);
    } else {
      console.log('Deal saved!');
      setModalVisible(false);
      setNewDeal({ price: '', instructions: '' });
      setImageUri(null);
      fetchDeals(); // Refresh list
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {deals.length > 0 ? (
          deals.map((deal, index) => (
            <StudentDealCard
              key={index}
              instructions={deal.instructions}
              price={deal.price}
              image={{ uri: deal.image }}
              userId={deal.owner}
              created_at=''
              place = ''
            />
          ))
        ) : (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text>No deals available.</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
        <Text style={styles.addButtonLabel}>New Deal</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Deal</Text>

            <TextInput
              placeholder="Price"
              value={newDeal.price}
              onChangeText={(text) => setNewDeal({ ...newDeal, price: text })}
              style={styles.input}
            />

            <TextInput
              placeholder="Instructions"
              value={newDeal.instructions}
              onChangeText={(text) => setNewDeal({ ...newDeal, instructions: text })}
              style={styles.input}
            />

            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Upload Image</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            )}

            <TouchableOpacity onPress={handleCreateDeal} style={styles.uploadButton}>
              <Text style={{ color: '#fff' }}>Create Deal</Text>
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

export default DealsTab;
