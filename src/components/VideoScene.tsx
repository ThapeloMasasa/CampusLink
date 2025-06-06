import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, AppState, AppStateStatus } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

type Scene = {
  videoUri: string;
  likes: number;
  comments: JSON;
  shares: number;
  isFocused?: boolean; // Bonus prop to control visibility focus
};

const CARD_VERTICAL_MARGIN = 20;
const CARD_HORIZONTAL_MARGIN = 16;
const CARD_HEIGHT = screenHeight * 0.7; // ~70% of screen height for card

const VideoScene: React.FC<Scene> = ({
  videoUri,
  likes,
  comments,
  shares,
  isFocused = true, // default to true if not passed
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const insets = useSafeAreaInsets();
  const [appState, setAppState] = useState(AppState.currentState);

  const player = useVideoPlayer(videoUri, player => {
    player.loop = true;
    player.play();
  });

  // Pause/play based on app state (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.match(/active/) && nextAppState.match(/inactive|background/)) {
        player.pause();
      } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (isFocused) player.play(); // Only play if focused
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, [appState, player, isFocused]);

  // Bonus: Pause/play based on isFocused prop changes
  useEffect(() => {
    if (isFocused) {
      // Only play if app is active
      if (appState === 'active') player.play();
    } else {
      player.pause();
    }
  }, [isFocused, player, appState]);

  const toggleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <View
      style={[
        styles.screenContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.cardContainer}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />

        <View style={styles.overlay}>
          <View style={styles.buttonColumn}>
            <TouchableOpacity onPress={toggleLike} style={styles.iconButton}>
              <Ionicons name="heart" size={36} color={liked ? '#ef4444' : 'white'} />
              <Text style={styles.iconText}>{likeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubble-outline" size={32} color="white" />
              <Text style={styles.iconText}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-redo-outline" size={30} color="white" />
              <Text style={styles.iconText}>{shares}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    borderColor: '#ffffff80', // semi-transparent white border

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    // Elevation for Android
    elevation: 10,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
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
});

export default VideoScene;
