import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import ProfileIcon from '../../components/ProfileIcon'; 
import { DirectMessage, DirectMessageScreenProps } from '../../types/types';



const DirectMessageScreen: React.FC<DirectMessageScreenProps> = ({ route }) => {
  const { username } = route.params;
  
  const [messages, setMessages] = useState<DirectMessage[]>([
    { id: '1', sender: 'other', text: 'Hi there!' },
    { id: '2', sender: 'me', text: 'Hello!' },
    { id: '3', sender: 'other', text: 'How are you?' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', text: inputText }]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={100}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <ProfileIcon userId={username} />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    marginBottom: 35,
  },
  input: {
    flex: 1,
    height: 35,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    
    
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,

   
  },
});

export default DirectMessageScreen;
