// screens/InboxScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DirectMessage } from '../../types/types';
import { InboxScreenNavigationProp } from '../../types/types';
type DMPreview = {
  id: string;
  name: string;
  latestMessage: string;
  timestamp: string;
  profileImage: string;
};


const dummyChats: DMPreview[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    latestMessage: 'Hey! Are you coming to class?',
    timestamp: '10:24 AM',
    profileImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Ben Foster',
    latestMessage: 'Sure, I’ll send the notes later.',
    timestamp: '9:15 AM',
    profileImage: 'https://i.pravatar.cc/150?img=2',
  },
];





const InboxScreen = ({}) => {
  const navigation = useNavigation<InboxScreenNavigationProp>();
  const [chats, setChats] = useState<DMPreview[]>([]);

  useEffect(() => {
    
    setChats(dummyChats);
  }, []);

  const renderItem = ({ item }: { item: DMPreview }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => navigation.navigate('DirectMessageScreen', { username: item.id })}
    >
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.messageInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.latestMessage} numberOfLines={1}>{item.latestMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  latestMessage: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
});
