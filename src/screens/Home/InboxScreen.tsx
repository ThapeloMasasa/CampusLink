import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InboxScreenNavigationProp, DMPreview } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { calculateAge } from '../../utils/calculateTime';

const InboxScreen = () => {
  const navigation = useNavigation<InboxScreenNavigationProp>();
  const [chats, setChats] = useState<DMPreview[]>([]);
  const { state } = useGlobalContext();

  useEffect(() => {
    const latestMessages = loadUserMessages();
    const enrichedMessages = enrichWithProfileData(latestMessages);

    const updatedChats: DMPreview[] = Object.entries(enrichedMessages).map(([userId, msg]) => ({
      id: userId,
      name: msg.full_name ?? 'Unknown',
      latestMessage: msg.content,
      timestamp: calculateAge(msg.created_at),
      profileImage: msg.avatar_url ?? 'https://i.pravatar.cc/150',
    }));

    setChats(updatedChats);
  }, [state.allMessages, state.allProfiles]);

  const loadUserMessages = () => {
    if (!state.allMessages || !state.currentUserId) return {};

    const currentUserMessages = state.allMessages.filter(
      msg =>
        !msg.is_group &&
        (msg.sender_id === state.currentUserId || msg.receiver_id === state.currentUserId)
    );

    const latestMessages: { [userId: string]: typeof currentUserMessages[0] } = {};

    currentUserMessages.forEach(msg => {
      const otherUserId =
        msg.sender_id === state.currentUserId ? msg.receiver_id : msg.sender_id;

      if (typeof otherUserId === 'string') {
        const existingMsg = latestMessages[otherUserId];
        if (!existingMsg || new Date(msg.created_at) > new Date(existingMsg.created_at)) {
          latestMessages[otherUserId] = msg;
        }
      }
    });

    return latestMessages;
  };

  const enrichWithProfileData = (
    messages: { [userId: string]: any }
  ): { [userId: string]: any } => {
    if (!state.allProfiles) return messages;

    const updated: { [userId: string]: any } = {};

    for (const [userId, msg] of Object.entries(messages)) {
      const profile = state.allProfiles.find(p => p.id === userId);
      updated[userId] = {
        ...msg,
        full_name: profile?.full_name ?? 'Unknown',
        avatar_url: profile?.avatar_url ?? 'https://i.pravatar.cc/150',
      };
    }

    return updated;
  };

  const renderItem = ({ item }: { item: DMPreview }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => navigation.navigate('DirectMessageScreen', { username: item.name })}
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
