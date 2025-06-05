// PostCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import moment from 'moment';
import ProfileIcon from './ProfileIcon';
import { useGlobalContext } from '../contexts/GlobalContext';
import { PostProps } from '../types/types';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const hp = (percentage: number) => (percentage * deviceHeight) / 100;

const PostCard: React.FC<PostProps> = ({ title, content, image, mediaType, likes, mypost, userId, createdAt, shouldPlay, scrollY}) => {
  const { state } = useGlobalContext();
  const [liked, setLiked] = React.useState(false);
  const [numLikes, setNumLikes] = React.useState(likes);
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const [cardY, setCardY] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const profiles = state.allProfiles || [];
  const userProfile = profiles.find(profile => profile.id === userId);
  const userName = userProfile?.full_name || '';
  const date = moment(createdAt).format("MMM D");

  const player = useVideoPlayer(typeof image === 'string' ? image : image.uri, player => {
    player.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (!scrollY || mediaType !== 'video' || !player) return;

    const listener = scrollY.addListener(({ value }) => {
      const isInView = value + deviceHeight > cardY + 100 && cardY > value - 100;
      if (isInView) {
        if (showVideo && !isPlaying) player.play();
      } else {
        if (isPlaying) player.pause();
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, cardY, isPlaying, showVideo]);

  useEffect(() => {
    if (!player) return;
    shouldPlay ? player.play() : player.pause();
  }, [shouldPlay, player]);

  const handleLikePress = () => {
    setNumLikes(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  const dummyComments = [
    { id: 1, name: 'Alice', text: 'Great post!', replies: [{ id: '1-1', name: 'You', text: 'Thanks a lot! 😊' }] },
    { id: 2, name: 'Charlie', text: 'Amazing insight, thanks for sharing!', replies: [] },
    { id: 3, name: 'Dana', text: 'This made my day better 😊', replies: [{ id: '3-1', name: 'You', text: 'Happy to hear that!' }] },
  ];

  return (
    <View style={[styles.container, styles.shadow]} onLayout={e => setCardY(e.nativeEvent.layout.y)}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <ProfileIcon userId={userId} />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.postTime}>{date}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={hp(3.4)} color={'#494949'} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          <Text>{content}</Text>
        </View>

        {mediaType === 'video' ? (
          showVideo ? (
            <VideoView
              style={styles.postMedia}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Image
                source={image}
                style={styles.postMedia}
                contentFit='cover'
              />
              <TouchableOpacity
                style={styles.playIconOverlay}
                onPress={() => setShowVideo(true)}
              >
                <Ionicons name="play-circle" size={64} color="white" />
              </TouchableOpacity>
            </View>
          )
        ) : (
          <Image
            source={image}
            style={styles.postMedia}
            contentFit='cover'
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons name="heart" size={24} color={liked ? '#ef4444' : '#7C7C7C'} />
          </TouchableOpacity>
          <Text style={styles.count}>{numLikes}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={() => setCommentsVisible(true)}>
            <Ionicons name="chatbubble-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={commentsVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <Pressable onPress={() => setCommentsVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </Pressable>
            </View>
            <ScrollView style={styles.commentsList}>
              {dummyComments.map(comment => (
                <View key={comment.id} style={styles.commentCard}>
                  <Text style={styles.commentName}>{comment.name}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.replies.length > 0 && (
                    <View style={styles.repliesContainer}>
                      {comment.replies.map(reply => (
                        <View key={reply.id} style={styles.replyCard}>
                          <Text style={styles.replyName}>{reply.name}</Text>
                          <Text style={styles.replyText}>{reply.text}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: 24,
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#e3e3e3',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    fontSize: hp(1.7),
    fontWeight: '500',
  },
  postTime: {
    fontSize: hp(1.4),
    color: '#7C7C7C',
    fontWeight: '500',
  },
  content: { gap: 10 },
  postBody: { marginLeft: 5 },
  postMedia: {
    height: hp(40),
    width: '100%',
    borderRadius: 18,
  },
  videoPlaceholder: {
    position: 'relative',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {
    fontSize: hp(1.8),
    color: '#494949',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  commentsList: { paddingBottom: 10 },
  commentCard: {
    marginBottom: 12,
    backgroundColor: '#f4f4f5',
    padding: 10,
    borderRadius: 10,
  },
  commentName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: { color: '#333' },
  repliesContainer: {
    marginTop: 8,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#e5e7eb',
    gap: 8,
  },
  replyCard: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
  },
  replyName: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 2,
  },
  replyText: {
    fontSize: 13,
    color: '#333',
  },
});

export default PostCard;
