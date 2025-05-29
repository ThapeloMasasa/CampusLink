import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { supabase } from '../../../supabaseClient';
import ProfileIcon from '../../components/ProfileIcon';
import { DirectMessage, DirectMessageScreenProps } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';

const DirectMessageScreen: React.FC<DirectMessageScreenProps> = ({ route }) => {
  const { username } = route.params;
  let countMessages =  Math.floor(Math.random() * 1000000000);
  const { state } = useGlobalContext();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const userId = state.currentUserId;
  const [receiverId, setReceiverId] = useState<string | null>(null);
 
  useEffect(() => {
    countMessages += 1
    if (userId) {
      loadConversation();
    }
  }, [userId]);

  const loadConversation = async () => {
    try {
      // 1. Get receiver ID
      const { data: targetUser, error: userErr } = await supabase
        .from('Profile')
        .select('id')
        .eq('full_name', username)
        .single();

      if (userErr || !targetUser) throw new Error('User not found');
      const otherUserId = targetUser.id;

      setReceiverId(otherUserId);

      // 2. Fetch messages between current user and other user
      const { data: msgs, error: msgErr } = await supabase
        .from('Messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .eq('is_group', false)
        .order('created_at', { ascending: true });

      if (msgErr) throw msgErr;
      setMessages(
        msgs.map((msg) => ({
          id: msg.id,
          sender: msg.sender_id === userId ? 'me' : 'other',
          content: msg.content,
        }))
      );
    } catch (err) {
      console.error(err);
      Alert.alert('Error loading conversation');
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '' || !receiverId || !userId) return;

    const { data, error } = await supabase
      .from('Messages')
      .insert([
        {
          sender_id: userId,
          receiver_id: receiverId,
          is_group: false,
          content: inputText,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [
        ...prev,
        {
          id: countMessages.toString(),
          sender: state.currentUserId,
          content: inputText,
        },
      ]);
      setInputText('');
    } else {
      console.log(error)
    }
  };
 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.topBar}>
        <ProfileIcon userId={receiverId} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />

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
