import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../supabaseClient'; // adjust import path
import { useGlobalContext } from '../contexts/GlobalContext';
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';

type createGroupProps = {
  visible: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ visible, onClose }: createGroupProps) {
  const { state } = useGlobalContext();
  const [groupName, setGroupName] = useState('');
  const [needPermission, setNeedPermissions] = useState(false);
  const [hasSections, setHasSections] = useState(false);
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [addSections, setAddSections] = useState(false);
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [sectionNames, setSectionNames] = useState(['']);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setGroupImage(result.assets[0].uri);
    }
  };

  const handleSectionCountChange = (value: number) => {
    setNumberOfSections(value);
    setSectionNames(Array(value).fill(''));
    setShowDropdown(false);
  };

  const updateSectionName = (index: number, name: string) => {
    const updated = [...sectionNames];
    updated[index] = name;
    setSectionNames(updated);
  };

  const handleCreateGroup = async () => {
  if (!groupName || (addSections && sectionNames.some(name => !name))) {
    return Alert.alert('Validation', 'Please complete all fields.');
  }

  setLoading(true);

  try {
    let imageUrl = null;

    if (groupImage) {
      const base64 = await FileSystem.readAsStringAsync(groupImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileName = `${groupName}/post-${Date.now()}.jpg`;
      const contentType = 'image/jpeg';

      const { data, error } = await supabase.storage
        .from('group-images')
        .upload(fileName, Buffer.from(base64, 'base64'), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error('Image upload error:', error.message);
        throw error;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('group-images')
        .getPublicUrl(fileName);
      imageUrl = publicUrlData?.publicUrl ?? null;
    }
    const formattedSections = addSections ? sectionNames.join('/') : null;
    const { data, error } = await supabase
      .from('Groups')
      .insert([
        {
          name: groupName,
          sections: formattedSections,
          admin: state.currentUserId,
          open: true,
          has_sections: addSections,
          image: imageUrl,
        },
      ]);

    if (error) {
      console.error('Insert error:', error);
      Alert.alert('Error', 'Could not create group');
    } else {
      Alert.alert('Success', 'Group created successfully');
      onClose();
      resetFields();
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    Alert.alert('Error', 'Unexpected error occurred');
  } finally {
    setLoading(false);
  }
};

  const resetFields = () => {
    setGroupName('');
    setNeedPermissions(false);
    setHasSections(false);
    setGroupImage(null);
    setAddSections(false);
    setNumberOfSections(1);
    setSectionNames(['']);
    setShowDropdown(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>Create Group</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {groupImage ? (
                <Image source={{ uri: groupImage }} style={styles.groupImage} />
              ) : (
                <Text style={styles.imageText}>Pick Group Image</Text>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setAddSections(!addSections)}
            >
              <Text style={styles.radioLabel}>
                <Text style={{ fontWeight: 'bold' }}>{addSections ? '✓ ' : '○ '}</Text>
                Add Sections
              </Text>
            </TouchableOpacity>

            {addSections && (
              <>
                <Text style={styles.label}>Number of Sections</Text>
                <TouchableOpacity
                  onPress={() => setShowDropdown(!showDropdown)}
                  style={styles.dropdownButton}
                >
                  <Text>{numberOfSections} Section{numberOfSections > 1 ? 's' : ''}</Text>
                </TouchableOpacity>

                {showDropdown && (
                  <View style={styles.dropdownList}>
                    {[1, 2, 3, 4].map((num) => (
                      <TouchableOpacity
                        key={num}
                        onPress={() => handleSectionCountChange(num)}
                        style={styles.dropdownItem}
                      >
                        <Text>{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {sectionNames.map((name, index) => (
                  <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={`Section ${index + 1} Name`}
                    value={name}
                    onChangeText={(text) => updateSectionName(index, text)}
                  />
                ))}
              </>
            )}

            <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup} disabled={loading}>
              <Text style={styles.createButtonText}>{loading ? 'Creating...' : 'Create'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center',
  },
  modal: {
    width: '90%', backgroundColor: '#fff', borderRadius: 15, padding: 20, maxHeight: '90%',
  },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 10,
  },
  imagePicker: {
    backgroundColor: '#f0f0f0', borderRadius: 10, height: 150, justifyContent: 'center',
    alignItems: 'center', marginBottom: 15,
  },
  imageText: { color: '#666' },
  groupImage: { width: '100%', height: 150, borderRadius: 10 },
  radioButton: { marginTop: 15 },
  radioLabel: { fontSize: 16, color: '#333' },
  label: { marginTop: 10, fontWeight: 'bold' },

  dropdownButton: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginTop: 5, width: 150,
  },
  dropdownList: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginTop: 5, backgroundColor: '#fff', width: 150,
  },
  dropdownItem: {
    padding: 10,
  },

  createButton: {
    marginTop: 20, backgroundColor: '#3B82F6', padding: 12, borderRadius: 10,
  },
  createButtonText: {
    color: '#fff', textAlign: 'center', fontWeight: 'bold',
  },
  cancelButton: { marginTop: 10 },
  cancelButtonText: { color: '#FF4D4F', textAlign: 'center' },
});
