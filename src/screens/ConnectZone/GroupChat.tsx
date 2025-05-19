import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Message } from '../../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from '../../components/ProfileIcon';
import { GroupChatRouteProp } from '../../types/types';

const initialMessagesData: { [key: string]: Message[] } = {
  General: [
    { id: '1', text: 'Hello everyone!', sender: 'group', profile: 'Masasa' },
    { id: '2', text: 'Welcome to General', sender: 'group', profile: 'Katie' },
    { id: '3', text: 'Hey there!', sender: 'me', profile: '' },
  ],
  LeetCode: [
    { id: '4', text: 'Any tips for Two Sum?', sender: 'group', profile: 'Masasa' },
    { id: '5', text: 'I usually use hashmaps!', sender: 'me', profile: '' },
    { id: '6', text: 'Let’s learn DFS vs BFS', sender: 'group', profile: 'Danny' },
    { id: '7', text: 'Dynamic programming is challenging', sender: 'me', profile: '' },
  ],
  Resumes: [
    { id: '8', text: 'I need help with my resume', sender: 'group', profile: 'Masasa' },
    { id: '9', text: 'Any tips for resume projects?', sender: 'me', profile: '' },
    { id: '10', text: 'Who wants to critique my resume?', sender: 'group', profile: 'John' },
    { id: '11', text: 'Resume tips, anyone?', sender: 'me', profile: '' },
  ],
  Projects: [
    { id: '12', text: 'React developer projects to work on', sender: 'group', profile: 'Lenox' },
    { id: '13', text: 'Java projects are the best', sender: 'me', profile: '' },
    { id: '14', text: 'Arduino is meant for C++', sender: 'group', profile: 'Miranda' },
    { id: '15', text: 'I will try that', sender: 'me', profile: '' },
  ],
};

let messageCount = 16;

const GroupChat = () => {
  const route = useRoute<GroupChatRouteProp>();
  const { sectionName } = route.params;
  const navigation = useNavigation();

  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(initialMessagesData);
  const [newMessage, setNewMessage] = useState<string>('');
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: sectionName,
    });
  }, [navigation, sectionName]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    messageCount += 1;
    const newMsg: Message = {
      id: messageCount.toString(),
      text: newMessage,
      sender: 'me',
      profile: '',
    };

    setMessages((prev) => ({
      ...prev,
      [sectionName]: [...(prev[sectionName] || []), newMsg],
    }));
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={130}
    >
      <View style={styles.container}>
        <FlatList
          data={messages[sectionName] || []}
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

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageBubble: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  userMessage: { flexDirection: 'row' },
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
  inputArea: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    alignItems: 'center',
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
});

export default GroupChat;
