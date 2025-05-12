import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';

const Post: React.FC<PostProps> = ({ title, content, image, likes, shares }) => {
  return (
    <View style={styles.postContainer}>
      
      {/* Top image */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
      )}

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
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden', // ⭐ Important: clip child corners!
  },
  imageContainer: {
    width: '100%',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // fully covers the area
  },
  middle: {
    padding: 16, // Now padding is inside, not on outer container
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111827',
  },
  content: {
    fontSize: 15,
    color: '#374151',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
  },
  statText: {
    fontSize: 15,
    color: '#6B7280',
  },
});

export default Post;
