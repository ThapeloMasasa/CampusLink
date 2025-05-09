import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EmojiPicker from './EmojiPicker'; // Or your EmojiPicker package
import { YapProps } from '../types/types';

const Yap = ({ title, content, initialLikes = 0, initialReactions = [] }: YapProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [rank, setRank] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(initialReactions);

  const updateRank = (likes: number) => {
    setRank(likes > 10 ? 5 : 100); // Example
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    updateRank(newLikes);
  };

  const handleReaction = (emoji: string) => {
    setReactions([...reactions, emoji]);
    setShowReactions(false);
  };

  return (
    <View style={styles.yapCard}>
      
      {/* Title */}
      <Text style={styles.yapTitle}>{title}</Text>

      {/* Content */}
      <Text style={styles.yapContent}>{content}</Text>

      {/* First bottom row: emojis */}
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={handleLike} style={styles.iconContainer}>
          <Text style={styles.emoji}>👍</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Text style={styles.emoji}>🏆</Text>
        </View>
        <TouchableOpacity onPress={() => setShowReactions(true)} style={styles.iconContainer}>
          <Text style={styles.emoji}>🙂</Text>
        </TouchableOpacity>
      </View>

      {/* Second bottom row: labels */}
      <View style={styles.bottomRow}>
        <Text style={styles.label}>Likes: {likes}</Text>
        <Text style={styles.label}>Rank: {rank}</Text>
        <Text style={styles.label}>Reactions: {reactions.length}</Text>
      </View>
     
      {/* Emoji Picker */}
      <EmojiPicker 
        visible={showReactions}
        onClose={() => setShowReactions(false)}
        onSelect={handleReaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  yapCard: {
    width: '90%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'gray',
    borderRadius: 12,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 10,
    height: 250, // taller for new layout
    justifyContent: 'space-between',
  },
  yapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'SpaceGrotesk-Bold',
  },
  yapContent: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'medium',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  bubbleTail: {
    width: 0,
    height: 0,
    borderTopWidth: 30,    // was 20 → bigger
    borderTopColor: '#f9f9f9',
    borderLeftWidth: 25,   // was 15 → wider
    borderLeftColor: 'transparent',
    borderRightWidth: 25,  // was 15 → wider
    borderRightColor: 'transparent',
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-start',
    marginLeft: 40,        // a bit more left offset
    marginTop: -10,        // a bit more overlap
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Yap;
