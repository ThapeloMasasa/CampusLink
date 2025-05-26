
import React, {useLayoutEffect, useState}from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput  } from 'react-native';
import { SectionScreenProps } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';

const SectionScreen = ({ route, navigation }: SectionScreenProps) => {
  const { group } = route.params;
  const {state} = useGlobalContext();
  const [searchResults, setSearchResults] = useState(state.allProfiles);
  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = group.admin === state.currentUserId;
  const [modalVisible, setModalVisible] = useState(false);

   useLayoutEffect(() => {
  navigation.setOptions({
    title: 'Sections',
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        
        {isAdmin && (
          <>
          <TouchableOpacity onPress={() => {/* open user profile */}}>
          <Ionicons name="person-circle-outline" size={28} color="#111827" />
        </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 5 }}>
            <Ionicons name="add-circle-outline" size={28} color="#3B82F6" />
          </TouchableOpacity>
          </>
        )}
      </View>
    ),
  });
}, [navigation, isAdmin]);

  return (
    <View style={styles.container}>
      <FlatList
        data={group.sections}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() =>
              navigation.navigate('GroupChat', {
                section: item,
                groupName: group.name,
                admin:group.admin
              })
            }
          >
            <Text style={styles.sectionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  }}>
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      maxHeight: '80%',
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add User to Group</Text>
      <TextInput
        placeholder="Search user by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.full_name}
        renderItem={({ item }) => (
          <TouchableOpacity style={{
            padding: 10,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
            <Text>{item.full_name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ color: '#666' }}>No users found</Text>}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{
          marginTop: 15,
          backgroundColor: '#3B82F6',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  sectionButton: {
    padding: 15,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    marginVertical: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SectionScreen;
