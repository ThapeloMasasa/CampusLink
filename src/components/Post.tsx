import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';

const Post: React.FC<PostProps> = ({ title, content, image, likes, reactions, mypost, userId }) => {
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
      {
        mypost ? <View style={styles.statsRow}>
        <Text style={styles.statText}>👍  {likes}</Text>
        <Text style={styles.statText}>🙂  {reactions.length > 0 ? reactions.length: 0}</Text>
      </View> :<View style={styles.statsRow}>
        <Text style={styles.statText}>👍  {likes}</Text>
        <ProfileIcon userId={userId} />
        <Text style={styles.statText}>🙂  {reactions.length > 0 ? reactions.length: 0}</Text>
      </View>

      }

    </View>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  middle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    paddingBottom: 14,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statText: {
    fontSize: 15,
    color: '#6B7280',
  },
});


export default Post;
