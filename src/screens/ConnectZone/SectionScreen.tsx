import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform  } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { Message } from '../../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from '../../components/ProfileIcon';
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

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
    { id: '1', text: 'Hello everyone!', sender: 'group', profile: "Masasa"},
    { id: '2', text: 'Welcome to General', sender: 'group', profile: "Katie"},
    { id: '3', text: 'Hey there!', sender: 'me' , profile: ""},
  ],
  LeetCode: [
    { id: '4', text: 'Any tips for Two Sum?', sender: 'group' , profile: "Masasa"},
    { id: '5', text: 'I usually use hashmaps!', sender: 'me' , profile: ""},
    { id: '6', text: 'Lets learn DFS vs BFS', sender: 'group' , profile: "Danny"},
    { id: '7', text: 'Dynamic programming is Challeging', sender: 'me' , profile: ""},
  ],
  Resumes: [
    { id: '8', text: 'I need help with my resume', sender: 'group', profile: "Masasa" },
    { id: '9', text: 'Any tips for types of resume projects', sender: 'me' , profile: ""},
    { id: '10', text: 'Who wants to critic my resume', sender: 'group', profile: "John" },
    { id: '11', text: 'resume tips, anyone??', sender: 'me', profile: "" },
  ],
  Projects: [
    { id: '12', text: 'React developer projects to work on', sender: 'group', profile: "Lenox" },
    { id: '13', text: 'Java Projects are the best', sender: 'me' ,profile: ""},
    { id: '14', text: 'Adruino is meant to work with C++', sender: 'group' , profile: "Miranda"},
    { id: '15', text: 'I will try that', sender: 'me' ,  profile: ""},
  ],
};


const SectionScreen = () => {
  let messageCount = 16
  const route = useRoute<SectionScreenRouteProp>();
  const { groupName } = route.params;
  const navigation = useNavigation();
  const [selectedSection, setSelectedSection] = useState<string>('General');
 const [messages, setMessages] = useState<{ [key: string]: Message[] }>(messagesData);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

 
  useLayoutEffect(() => {
    navigation.setOptions({
     title: groupName
    });
  }, [navigation]);
  const handleSendMessage = () => {
  if (newMessage.trim() === '') return;

  messageCount += 1;
  const newMsg: Message = {
    id: messageCount.toString(),
    text: newMessage,
    sender: 'me',
    profile: '',
  };

  setMessages((prev) => ({
    ...prev,
    [selectedSection]: [...(prev[selectedSection] || []), newMsg],
  }));
  setNewMessage('');
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
          <Text style={styles.toggleText}>{sidebarOpen ? <View style={styles.chevron}><Icon size={20}  name="chevron-left" /></View> : <View style={styles.chevron}><Icon size={20} name="chevron-right" /></View>}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>
          {selectedSection}
        </Text>
       

        <FlatList
  data={
    messages[selectedSection]?.map((msg, index) => ({
      id: index.toString(),
      text: msg.text,
      sender: msg.sender, 
      profile: msg.profile,  
    })) || []
  }
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.userMessage,
        item.sender === 'group' && { flexDirection: 'row', alignItems: 'center' },
      ]}
    >
      {item.sender === 'group' ? (
        <>
          <ProfileIcon userId={item.profile} />
          <Text style={styles.groupMessage}>{item.text}</Text>
        </>
      ) : (
        <Text>{item.text}</Text>
      )}
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
  header: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
    },

  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#fff',
  },
 userMessage:{
  flexDirection: 'row',
 },
 chevron:{
  width: 25,           
   height: 25,          
  borderRadius: 12,    
  backgroundColor: 'white',  
  borderWidth: 2,      
  borderColor: '#ccc', 
  justifyContent: 'center',
  alignItems: 'center',

 },
  messageBubble: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  
  groupWrapper: {
    backgroundColor: '#fff',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e8e8e8', 
  },
  groupMessage: {
    marginLeft: 8,
    backgroundColor: '#8e8a8a',
    padding: 8,
    borderRadius: 10,
    color: 'white',
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
    alignSelf: 'flex-start',
    padding: 5,
    marginBottom: 5,
  },
  toggleText: {
    color: '#007bff',
    fontSize: 12,
  },
});

export default SectionScreen;
