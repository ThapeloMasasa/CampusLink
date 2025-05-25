import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity,
  Linking, Modal
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../contexts/GlobalContext';
import PostsTab from '../../components/postsTab';
import YapsTab from '../../components/YapsTab';
import DealsTab from '../../components/DealsTab';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { supabase } from '../../../supabaseClient';
import { loadUserProfileFromContext } from '../../utils/uploadImage';
import { currentUser, post } from '../../types/types';
import CreateGroupModal from '../../components/GroupModal';

if (typeof global.Buffer === 'undefined') global.Buffer = Buffer;


const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const navigation = useNavigation();
  const { state, dispatch } = useGlobalContext();
  const [profile, setProfile] = useState<currentUser>();
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const linkedIn = profile?.linkedIn_url || '';
  const instagram = profile?.insta_url || '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch({ type: 'LOGOUT' })} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'Profile',
    });
  }, [navigation]);

  useEffect(() => {
    try {
      const { profile, posts } = loadUserProfileFromContext(state);
      setProfile(profile);
      setPosts(posts);
    } catch (err) {
      console.error('Context Load Error:', err);
    } finally {
      setLoading(false);
    }
  }, [state]);
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled) setGroupImage(result.assets[0].uri);
};
  const updateDP = async ()=>{
     const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const fileName = `newDP_${Date.now()}.jpg`;

      try {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const { error: storageError } = await supabase.storage
          .from('myday')
          .upload(fileName, Buffer.from(base64, 'base64'), {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (storageError) throw storageError;

        const { data: urlData } = supabase.storage
          .from('myday')
          .getPublicUrl(fileName);

        const publicUrl = urlData?.publicUrl;

        const { error: dbError } = await supabase
          .from('Profile')
          .update([{ avatar_url: publicUrl, }])
          .eq('id', state.currentUserId);

        if (dbError) throw dbError;

        alert('Updated Profile Pic');
      } catch (e) {
        console.error('Update failed:', e);
        alert('Failed to update DP');
      }
    }

    setImageModalVisible(false);

  }

  const onAddToMyDay = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const fileName = `myday_${Date.now()}.jpg`;

      try {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const { error: storageError } = await supabase.storage
          .from('myday')
          .upload(fileName, Buffer.from(base64, 'base64'), {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (storageError) throw storageError;

        const { data: urlData } = supabase.storage
          .from('myday')
          .getPublicUrl(fileName);

        const publicUrl = urlData?.publicUrl;

        const { error: dbError } = await supabase
          .from('Myday')
          .insert([{ image: publicUrl, owner: profile?.id }]);

        if (dbError) throw dbError;

        alert('Added to Scenes!');
      } catch (e) {
        console.error('Upload failed:', e);
        alert('Failed to upload image');
      }
    }

    setImageModalVisible(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profile?.full_name}</Text>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={() => setImageModalVisible(true)}>
          <Image
            source={
              profile?.avatar_url
                ? { uri: profile.avatar_url }
                : require('../../../assets/cropped-file.jpg')
            }
            style={styles.profileImage}
          />
          <View style={styles.plusIcon}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingInfo}>
            <Text style={styles.ratingNumber}>🤩 {profile?.rating ?? 0} 😎</Text>
            <Text style={styles.ratingText}>Rating</Text>
          </View>
          <TouchableOpacity
  onPress={() => setCreateModalVisible(true)}
  style={{ backgroundColor: '#8B5CF6', padding: 10, borderRadius: 10, marginVertical: 10 }}
>
  <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>+ Create Group</Text>
</TouchableOpacity>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {linkedIn && (
              <TouchableOpacity onPress={() => Linking.openURL(linkedIn)}>
                <Ionicons name="logo-linkedin" size={24} color="#0077B5" style={{ marginHorizontal: 10 }} />
              </TouchableOpacity>
            )}
            {instagram && (
              <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
                <Ionicons name="logo-instagram" size={24} color="#C13584" style={{ marginHorizontal: 10 }} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Posts">{() => <PostsTab posts={posts} />}</Tab.Screen>
          <Tab.Screen name="Yaps">{() => <YapsTab />}</Tab.Screen>
          <Tab.Screen name="Deals">{() => <DealsTab />}</Tab.Screen>
        </Tab.Navigator>
      </View>

      <Modal visible={imageModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={onAddToMyDay}>
              <Text style={styles.modalButtonText}>Add to Scenes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={updateDP}>
              <Text style={styles.modalButtonText}>Change Profile Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setImageModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CreateGroupModal
  visible={createModalVisible}
  onClose={() => setCreateModalVisible(false)}
/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Times New Roman' },
  profileImageContainer: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#000' },
  plusIcon: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fff', borderRadius: 12,
  },
  ratingSection: {
    backgroundColor: '#e0e0e0', borderRadius: 15, marginHorizontal: 20,
    padding: 10, alignItems: 'center',
  },
  ratingContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  ratingInfo: { alignItems: 'center' },
  ratingText: { fontWeight: 'bold', marginTop: 5 },
  ratingNumber: { fontWeight: 'bold', fontSize: 16 },
  modalBackground: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center',
  },
  createGroupButton: {
  backgroundColor: '#3B82F6',
  paddingHorizontal: 16,
  paddingVertical: 6,
  borderRadius: 8,
  marginTop: 10,
},
createGroupButtonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 14,
},

  modalContent: {
    width: 250, backgroundColor: '#fff', borderRadius: 10, padding: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF', padding: 10, borderRadius: 8, marginTop: 10,
  },
  modalButtonText: {
    color: 'white', textAlign: 'center', fontWeight: 'bold',
  },
});

export default ProfileScreen;
