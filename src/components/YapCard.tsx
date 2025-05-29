import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageProps,
} from 'react-native';
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
  onLike,
  onDislike,
  timestamp,
  distance,
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

  if (hasImage && imageUrl) {
    // Yap with image
    return (
      <View style={styles.card}>
        <Image source={{uri:imageUrl}} style={styles.yapImage} />
        <Text style={styles.content}>{content}</Text>

        <View style={styles.metaRow}>
          <View style={styles.votes}>
            <TouchableOpacity onPress={() => handleVotes(true)}>
              <Ionicons name="arrow-up" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{numVotes}</Text>
            <TouchableOpacity onPress={() => handleVotes(false)}>
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

        <Text style={styles.subInfo}>{age}</Text>
        {
        likes > 12 ? <View style={styles.flames}>
          <Text>🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥🔥 🔥 🔥 🔥 </Text>
        </View>: <></>
        }
        
      </View>
    );
  } else {
    // Regular yap without image
    return (
      <View style={styles.card}>
        <Text style={styles.content}>{content}</Text>

        <View style={styles.metaRow}>
          <View style={styles.votes}>
            <TouchableOpacity onPress={() => handleVotes(true)}>
              <Ionicons name="arrow-up" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.voteCount}>{numVotes}</Text>
            <TouchableOpacity onPress={() => handleVotes(false)}>
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

        <Text style={styles.subInfo}>{age}</Text>

        <View style={styles.flames}>
          <Text>🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥🔥 🔥 🔥 🔥 </Text>
        </View>
      </View>
    );
  }
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
  yapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
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
  flames: {
    paddingTop: 10,
    alignItems: 'center',
    flex: 1,
  },
});
