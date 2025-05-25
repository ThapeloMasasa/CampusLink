import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';
import { useGlobalContext } from '../contexts/GlobalContext';

const Post: React.FC<PostProps> = ({ title, content, image, likes,  mypost, userId }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useGlobalContext();
  const handleLikePress = () => {
    setLikeCount(prev => prev + 1);
  };
  const reactions = ['😀', '😀', '😀','😀','😀', '😡', '😡', '😡', '🎉', '🎉', '🎉', '😀', '😡', '🎉'];
  const reactionCounts = reactions.reduce((acc: Record<string, number>, emoji: string) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {});
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
        <TouchableOpacity onPress={handleLikePress}>
          <Text style={styles.statText}>👍 {likeCount}</Text>
        </TouchableOpacity>
       {state.currentUserId !== userId && !mypost && <ProfileIcon userId={userId} />}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.statText}>🙂 {reactions.length > 0 ? reactions.length : 0}</Text>
        </TouchableOpacity>
      </View>

      {/* Reaction Breakdown Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reactions</Text>
            <ScrollView>
              {Object.entries(reactionCounts).map(([emoji, count]) => {
  const countNumber = count as number;
  return (
    <Text key={emoji} style={styles.reactionText}>
      {emoji} {countNumber} 
    </Text>
  );
})}

              {Object.keys(reactionCounts).length === 0 && (
                <Text style={styles.reactionText}>No reactions yet</Text>
              )}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 10 }, // ⬅️ this adds shadow to the bottom
  elevation: 4, // Android shadow
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reactionText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#111827',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});

export default Post;
