import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type createGroupProps = {
  visible: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ visible, onClose }: createGroupProps) {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [addSections, setAddSections] = useState(false);
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [sectionNames, setSectionNames] = useState(['']);
  const [showDropdown, setShowDropdown] = useState(false);

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

            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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
