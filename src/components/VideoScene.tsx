import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  AppState,
  AppStateStatus,
  Modal,
  Animated,
  Pressable,
  Image,
  FlatList
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileIcon from './ProfileIcon';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

type Scene = {
  videoUri: string;
  likes: number;
  comments: JSON;
  owner: string | null;
  shares: number;
  caption: string;
  full_name: string;
  isFocused?: boolean;
};

const CARD_HORIZONTAL_MARGIN = 16;
const CARD_HEIGHT = screenHeight * 0.7;
const dummyComments = [
  {
    id: '1',
    user: {
      name: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    time: '2h ago',
    text: 'This video is so good! 🔥',
  },
  {
    id: '2',
    user: {
      name: 'James T.',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    time: '1h ago',
    text: 'Where was this filmed? Looks amazing!',
  },
  {
    id: '3',
    user: {
      name: 'Lina R.',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    time: '45m ago',
    text: 'The vibes are immaculate 🧘‍♀️💫',
  },
  {
    id: '4',
    user: {
      name: 'Tom W.',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    time: '10m ago',
    text: 'Haha this part had me dying 😂😂',
  },
];


const VideoScene: React.FC<Scene> = ({
  videoUri,
  likes,
  comments,
  shares,
  owner,
  caption,
  full_name,
  isFocused = true,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const insets = useSafeAreaInsets();
  const [appState, setAppState] = useState(AppState.currentState);
  const [commentVisible, setCommentVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const isMounted = useRef(true);

  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    try {
  player.play();
} catch (e) {
  console.warn('Failed to play video:', e);
}
  });

  useFocusEffect(
    React.useCallback(() => {
      isMounted.current = true;

      const resume = async () => {
        try {
          if (isMounted.current && appState === 'active' && isFocused) {
            await player.play();
          }
        } catch (err) {
          console.warn('Error resuming video on focus:', err);
        }
      };
      resume();

      return () => {
        isMounted.current = false;
        try {
          player.pause();
        } catch (_) {}
      };
    }, [player, appState, isFocused])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      try {
        if (isMounted.current) {
          if (appState.match(/active/) && nextAppState.match(/inactive|background/)) {
            await player.pause();
          } else if (appState.match(/inactive|background/) && nextAppState === 'active' && isFocused) {
            await player.play();
          }
        }
        setAppState(nextAppState);
      } catch (err) {
        console.warn('AppState change error:', err);
      }
    });

    return () => subscription.remove();
  }, [appState, player, isFocused]);

  useEffect(() => {
    const updatePlayback = async () => {
      try {
        if (isMounted.current) {
          if (isFocused && appState === 'active') {
            await player.play();
          } else {
            await player.pause();
          }
        }
      } catch (err) {
        console.warn('Playback update error:', err);
      }
    };
    updatePlayback();
  }, [isFocused, player, appState]);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const openComments = () => {
    setCommentVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeComments = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setCommentVisible(false));
  };

  if (!videoUri) return null;

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.cardContainer}>
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />

        <View style={styles.overlayRight}>
          <View style={styles.buttonColumn}>
            <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
              <Ionicons name="heart" size={36} color={liked ? '#ef4444' : 'white'} />
              <Text style={styles.iconText}>{likeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openComments} style={styles.iconButton}>
              <Ionicons name="chatbubble-outline" size={32} color="white" />
              <Text style={styles.iconText}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-redo-outline" size={30} color="white" />
              <Text style={styles.iconText}>{shares}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.overlayBottomLeft}>
          <View style={styles.profileRow}>
            <View style={styles.profileImageWrapper}>
              <ProfileIcon userId={owner} />
            </View>
            <Text style={styles.ownerName}>{full_name}</Text>
          </View>
          {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        </View>
      </View>

      {/* Comments Modal */}
      <Modal transparent visible={commentVisible} animationType="none">
        <Pressable style={styles.backdrop} onPress={closeComments} />
        <Animated.View style={[styles.commentModal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Comments</Text>
            <TouchableOpacity onPress={closeComments}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', marginBottom: 14 }}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={{ width: 36, height: 36, borderRadius: 18, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {item.user.name}{' '}
                    <Text style={{ color: '#aaa', fontSize: 12 }}>{item.time}</Text>
                  </Text>
                  <Text style={{ color: 'white' }}>{item.text}</Text>
                </View>
              </View>
            )}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: screenWidth - CARD_HORIZONTAL_MARGIN * 2,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: '#ffffff80',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  buttonColumn: {
    gap: 25,
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  overlayBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    maxWidth: screenWidth * 0.6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImageWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#888',
    marginRight: 10,
    overflow: 'hidden',
  },
  ownerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
  commentModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight * 0.5,
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  commentContent: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000080',
  },
});

export default VideoScene;
