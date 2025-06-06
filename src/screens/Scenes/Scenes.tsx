import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ViewToken,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import VideoScene from '../../components/VideoScene';
import { supabase } from '../../../supabaseClient';
import { useGlobalContext } from '../../contexts/GlobalContext';

const Scenes = () => {
  const [scenes, setScenes] = useState<any[]>([]);
  const [focusedVideoId, setFocusedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { state } = useGlobalContext();

  const fetchScenes = async () => {
    const { data, error } = await supabase
      .from('Scenes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching scenes:', error.message);
    } else {
      setScenes(data);
      if (data.length > 0) setFocusedVideoId(data[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScenes();
  }, []);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const visibleItem = viewableItems.find(item => item.isViewable);
    if (visibleItem) {
      setFocusedVideoId(visibleItem.item.id);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (scenes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ color: '#fff' }}>No scenes found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={scenes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VideoScene
            videoUri={item.videoUri}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
            isFocused={item.id === focusedVideoId}
            owner = {item.owner}
            caption= {item.caption}
            full_name = {item.full_name}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default Scenes;
