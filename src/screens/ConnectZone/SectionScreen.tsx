import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform  } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { Message } from '../../types/types';


type SectionScreenRouteProp = RouteProp<RootStackParamList, 'Section'>;

const sections = ['General', 'LeetCode', 'Resumes', 'Projects'];

const initialMessagesData: { [key: string]: string[] } = {
  General: ['Hello everyone!', 'Welcome to General'],
  LeetCode: ['Any tips for Two Sum?', 'How to solve Hard problems?'],
  Resumes: ['Can someone review my resume?', 'Tips for tech resumes'],
  Projects: ['Showcasing my app!', 'Looking for project partners'],
};
const messagesData: { [key: string]: Message[] } = {
  General: [
    { id: '1', text: 'Hello everyone!', sender: 'group' },
    { id: '2', text: 'Welcome to General', sender: 'group' },
    { id: '3', text: 'Hey there!', sender: 'me' },
  ],
  LeetCode: [
    { id: '4', text: 'Any tips for Two Sum?', sender: 'group' },
    { id: '5', text: 'I usually use hashmaps!', sender: 'me' },
    { id: '6', text: 'Welcome to General', sender: 'group' },
    { id: '7', text: 'Hey there!', sender: 'me' },
  ],
  Resumes: [
    { id: '8', text: 'Any tips for Two Sum?', sender: 'group' },
    { id: '9', text: 'I usually use hashmaps!', sender: 'me' },
    { id: '10', text: 'Welcome to General', sender: 'group' },
    { id: '11', text: 'Hey there!', sender: 'me' },
  ],
  Projects: [
    { id: '12', text: 'Any tips for Two Sum?', sender: 'group' },
    { id: '13', text: 'I usually use hashmaps!', sender: 'me' },
    { id: '14', text: 'Welcome to General', sender: 'group' },
    { id: '15', text: 'Hey there!', sender: 'me' },
  ],
};

const SectionScreen = () => {
  const route = useRoute<SectionScreenRouteProp>();
  const { groupName } = route.params;

  const [selectedSection, setSelectedSection] = useState<string>('General');
  const [messages, setMessages] = useState<{ [key: string]: string[] }>(initialMessagesData);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedSection]: [...prevMessages[selectedSection], newMessage],
      }));
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={130}>
    <View style={styles.container}>
      {sidebarOpen && (
        <View style={styles.sidebar}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section}
              onPress={() => setSelectedSection(section)}
              style={[
                styles.sectionButton,
                selectedSection === section && styles.selectedButton,
              ]}
            >
              <Text style={styles.sectionText}>{section}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.chatArea}>
        <TouchableOpacity onPress={() => setSidebarOpen((prev) => !prev)} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{sidebarOpen ? 'Hide Sections' : 'Show Sections'}</Text>
        </TouchableOpacity>

        <Text style={styles.header}>
          {groupName} - {selectedSection}
        </Text>

        <FlatList
        data={messagesData[selectedSection]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.groupMessage,
      ]}
    >
      <Text>{item.text}</Text>
    </View>
  )}
/>

        <View style={{flexDirection: 'row',
                position: 'absolute',
                bottom: 10,
                right: 10,
                alignItems: 'center',}}>
          <TextInput
            style={[styles.input,
              ]}
            placeholder="Type a message..."
            
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 100, backgroundColor: '#ddd', paddingVertical: 20 },
  chatArea: { flex: 1, padding: 10 },
  sectionButton: { padding: 10 },
  selectedButton: { backgroundColor: '#bbb' },
  sectionText: { fontSize: 14 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },

  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#fff',
  },
  messageBubble: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e8e8e8', 
  },
  
  groupMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8e8a8a', 
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 5,
    marginBottom: 5,
  },
  toggleText: {
    color: '#007bff',
    fontSize: 12,
  },
});

export default SectionScreen;
