import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';

const Post: React.FC<PostProps> = ({ title, content, image, likes, shares }) => {
  return (
    <View style={styles.postContainer}>
      
      {/* Top image */}
      {image && <Image source={image} style={styles.image} />}

    {/* Middle: title and content */}
    <View style={styles.middle}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
      {/* Bottom: reactions, profile, shares */}
      
      <View style={styles.statsRow}>
        <Text style={styles.statText}>😊 {likes}</Text>
        <ProfileIcon userId="Masasa" />
        <Text style={styles.statText}>👍 {shares}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  middle:{
    paddingBottom: 25,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statText: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  content: {
    fontSize: 15,
    color: '#555',
  },
});

export default Post;
