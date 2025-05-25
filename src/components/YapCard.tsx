import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YikYakStyleYapProps } from '../types/types';
import { calculateAge } from '../utils/calculateTime';

const reactions = ['❤️', '😂', '😮', '😢', '😡'];

const YapCard: React.FC<YikYakStyleYapProps> = ({
  content,
  likes,
  onLike,
  onDislike,
  timestamp,
  distance,
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const age = calculateAge(timestamp);
  const handleReact = (reaction: string) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
  };

  const toggleReactions = () => {
    setShowReactions(true);
    setTimeout(() => setShowReactions(false), 2000);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.content}>{content}</Text>

      <View style={styles.metaRow}>
        <View style={styles.votes}>
          <TouchableOpacity onPress={onLike}>
            <Ionicons name="arrow-up" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.voteCount}>{Math.floor(Math.random() * 101)}</Text>
          <TouchableOpacity onPress={onDislike}>
            <Ionicons name="arrow-down" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.reactionArea} onPress={toggleReactions}>
          <Text style={styles.emojiIcon}>
            {selectedReaction ? selectedReaction : '🙂'}
          </Text>
        </TouchableOpacity>
      </View>

      {showReactions && (
        <View style={styles.reactionBar}>
          {reactions.map((emoji) => (
            <TouchableOpacity key={emoji} onPress={() => handleReact(emoji)}>
              <Text style={styles.reactionEmoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {
        <Text style={styles.subInfo}>
           {age}
        </Text>
      }

      <View style={styles.flames}>
        <Text>🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥🔥 🔥 🔥 🔥 </Text>
      </View>
    </View>
  );
};

export default YapCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f6e5db',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
  },
  flames: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    color: '#111827',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  votes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  voteCount: {
    fontSize: 16,
    marginHorizontal: 6,
    color: '#374151',
  },
  reactionArea: {
    padding: 6,
  },
  emojiIcon: {
    fontSize: 22,
  },
  subInfo: {
    marginTop: 8,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  reactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffffee',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  reactionEmoji: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});
