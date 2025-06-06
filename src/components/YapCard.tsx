import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { YikYakStyleYapProps } from '../types/types';
import { calculateAge } from '../utils/calculateTime';

const reactions = ['❤️', '😂', '😮', '😢', '😡', '😍'];

interface ExtendedYapProps extends YikYakStyleYapProps {
  hasImage: boolean;
  imageUrl?: string | null;
}
const YapCard: React.FC<ExtendedYapProps> = ({
  content,
  likes,
  timestamp,
  hasImage,
  imageUrl,
}) => {
  const [numVotes, setNumVotes] = useState(likes);
  const [alreadyUpVoted, setAlreadyUpVoted] = useState(false);
  const [alreadyDownVoted, setAlreadyDownVoted] = useState(false);
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

  const handleVotes = (upvote: boolean) => {
    if (upvote && !alreadyUpVoted) {
      setNumVotes(numVotes + 1);
      setAlreadyUpVoted(true);
      setAlreadyDownVoted(false);
    } else if (!upvote && !alreadyDownVoted) {
      setNumVotes(numVotes - 1);
      setAlreadyDownVoted(true);
      setAlreadyUpVoted(false);
    }
  };

  return (
    <LinearGradient
  colors={['#fbfbfb', '#9f8bda']} // Replace with your desired colors
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.cardContainer}
>
    <View style={styles.card}>
      <View style={styles.headerRow}>
  <View style={styles.textSection}>
    <Text style={styles.content}>{content}</Text>
    {/* maybe more info here */}
  </View>

  <View style={styles.rating}>
    <TouchableOpacity onPress={() => handleVotes(true)}>
      <Ionicons name="arrow-up" size={30} />
    </TouchableOpacity>
    <Text>{numVotes}</Text>
    <TouchableOpacity onPress={() => handleVotes(false)}>
      <Ionicons name="arrow-down" size={30} />
    </TouchableOpacity>
  </View>
</View>


      {hasImage && imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.yapImage} />
      )}

      <View style={styles.metaRow}>
        <TouchableOpacity style={styles.reactionArea} onPress={toggleReactions}>
          <Text style={styles.emojiIcon}>
            {selectedReaction ? selectedReaction : '🙂'}
          </Text>
        </TouchableOpacity>
        <Ionicons name="bookmark-outline" size={24} color="black" />
        <Ionicons   name="share-outline" size={24} />
        <Ionicons   name="chatbubble-outline" size={24} />
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

      <Text style={styles.subInfo}>{age}</Text>

      {likes > 1000 && (
        <View style={styles.flames}>
          <Text>🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥🔥 🔥 🔥 🔥 </Text>
        </View>
      )}
    </View>
    </LinearGradient>
  );
};

export default YapCard;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  textSection: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 15 // space between text and rating
  },
  rating: {
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8, 
  paddingRight: 10,
},

    card: {
  marginBottom: 12,
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)', // optional soft overlay
  borderRadius: 12,
},


  header: {
    padding: 12,
    flexDirection: 'row'
    
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#111827',
    fontFamily: 'Courier',
    justifyContent: 'center'
  },
  yapImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
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
    marginTop: 4,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
    fontFamily: 'Courier'
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
  flames: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

