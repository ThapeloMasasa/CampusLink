import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Message } from '../../types/types';
import ProfileIcon from '../../components/ProfileIcon';
import { GroupChatRouteProp } from '../../types/types';

const GroupChat = () => {
  const route = useRoute<GroupChatRouteProp>();
  const { section,groupName, admin } = route.params;
  const navigation = useNavigation();
  const { state } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  let countMessage = Math.floor(Math.random() * 1000000000);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const name = groupName+section
  const isAdmin = admin === state.currentUserId
  let header = ""
  if(section === ""){
    header = groupName
  }else{
    header = section
  }

  useLayoutEffect(() => {
  navigation.setOptions({
    title: header,
    headerLeft: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={() => {/* open user profile */}}>
          <Ionicons name="person-circle-outline" size={28} color="#111827" />
        </TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginLeft: 10 }}>
            <Ionicons name="add-circle-outline" size={28} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
    ),
  });
}, [navigation, section, isAdmin]);

  useEffect(() => {
    countMessage += 1
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('Messages')
    .select('*')
    .eq('is_group', true)
    .eq('group_id', name)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching group messages:', error);
  } else {
    setMessages(data || []);
  }
};
  const handleSendMessage = async () => {
  if (!newMessage.trim()) return;

  const { data, error } = await supabase.from('Messages').insert([
    {
      id:countMessage,
      content: newMessage,
      sender_id: state.currentUserId,
      group_id: name,
      is_group: true,
    },
  ]);

  if (error) {
    console.error('Error sending group message:', error);
  } else {
    fetchMessages();
    setNewMessage('');
  }
};
  const renderItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender_id === state.currentUserId;

    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.myMessage : styles.userMessage,
          !isCurrentUser && { flexDirection: 'row', alignItems: 'center' },
        ]}
      >
        {!isCurrentUser ? (
          <>
            <ProfileIcon userId={item.sender_id} />
            <Text style={styles.groupMessage}>{item.content}</Text>
          </>
        ) : (
          <Text>{item.content}</Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={130}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
