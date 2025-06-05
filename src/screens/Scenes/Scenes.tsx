import React, { useState, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ViewToken } from 'react-native';
import VideoScene from '../../components/VideoScene';

const data = [
  { id: '1', videoUri: 'https://example.com/video1.mp4', likes: 120, comments: 45, shares: 10 },
  { id: '2', videoUri: 'https://example.com/video2.mp4', likes: 89, comments: 20, shares: 5 },
  { id: '3', videoUri: 'https://mwvbsiccyhijubzaglxz.supabase.co/storage/v1/object/public/posts/e8b59278-1b92-4f3d-9c60-23e06b97ce44/post-1749089100934.mp4', likes: 89, comments: 20, shares: 5 },
  { id: '4', videoUri: 'https://mwvbsiccyhijubzaglxz.supabase.co/storage/v1/object/public/posts/e8b59278-1b92-4f3d-9c60-23e06b97ce44/post-1749102331886.mp4', likes: 120, comments: 45, shares: 10 },
];

const Scenes = () => {
  const [focusedVideoId, setFocusedVideoId] = useState<string>(data[0].id);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      // Pick the first fully visible item as focused
      const visibleItem = viewableItems.find(item => item.isViewable);
      if (visibleItem) {
        setFocusedVideoId(visibleItem.item.id);
      }
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VideoScene
            videoUri={item.videoUri}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
            isFocused={item.id === focusedVideoId} // Pass focus info here
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Scenes;
