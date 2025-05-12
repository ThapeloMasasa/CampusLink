import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import EmojiPicker from './EmojiPicker'; // Your emoji picker component
import { YapProps } from '../types/types';

const Yap = ({ title, content, initialLikes = 0, initialReactions = [] }: YapProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [rank, setRank] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [numReactions, setNumReactions] = useState(0)
  const [reactions, setReactions] = useState(initialReactions);

  const updateRank = (likes: number) => {
    setRank(likes > 10 ? 5 : 100); // Example rank calculation
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    updateRank(newLikes);
  };

  const handleReaction = (emoji: string) => {
    setReactions([...reactions, emoji]);
    setNumReactions(reactions.length)
    setShowReactions(false);
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../../assets/Speech.png')} // Your speech bubble background
        style={styles.yapCard}
        imageStyle={styles.bubbleImage}
      >
        {/* Title */}
        {
        likes > 10 ?  <Text style={styles.yapTitle}>🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 </Text> : <Text style={styles.yapTitle}></Text> 
        }
       

        {/* Content */}
        <Text style={styles.yapContent}>{content}</Text>

        {/* Reaction buttons: 👍 🏆 🙂 */}
        <View style={styles.bottomRow}>
        <View style = {{flexDirection:'row', paddingRight: 40, paddingBottom: 15 }}>
          <TouchableOpacity onPress={handleLike} style={styles.iconContainer}>
            <Text style={styles.emoji}>👍 {likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Text style={styles.emoji}>  </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowReactions(true)} style={styles.iconContainer}>
            <Text style={styles.emoji}>🙂 {numReactions}</Text>
          </TouchableOpacity>
        </View>
        </View>

      </ImageBackground>

      {/* Emoji Picker Modal */}
      <EmojiPicker 
        visible={showReactions}
        onClose={() => setShowReactions(false)}
        onSelect={handleReaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
    label: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  yapCard: {
    width: 330,
    height: 320,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bubbleImage: {
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  yapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111827',
    fontFamily: 'SpaceGrotesk-Bold', // Optional if you imported this font
  },
  yapContent: {
    fontSize: 24,
    textAlign: 'center',
    color: '#374151',
    fontWeight: '600',
    paddingTop: 30,
    
  },
  bottomRow: {
    position: 'absolute',    
    bottom: 25, 
    right: 5,                             
    flexDirection: 'row',     
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 4, 
  },
  emoji: {
    fontSize: 25,
  },
});

export default Yap;
