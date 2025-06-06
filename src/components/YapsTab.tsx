import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../supabaseClient';
import { useGlobalContext } from '../contexts/GlobalContext';
import YapCard from './YapCard';
import { YapType } from '../types/types'; 

const YapsTab = () => {
  const { state } = useGlobalContext();
  const [yaps, setYaps] = useState<YapType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYaps = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Yaps')
        .select('*')
        .eq('owner', state.currentUserId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching yaps:', error.message);
      } else {
        setYaps(data);
      }

      setLoading(false);
    };

    fetchYaps();
  }, [state.currentUserId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }
  return (
    <FlatList
      data={yaps}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <YapCard
              content={item.Content}
              likes={42}
              imageUrl={item.image}
              onLike={() => console.log('Liked')}
              onDislike={() => console.log('Disliked')}
              commentCount={7}
              hasImage = {item.has_image}
              timestamp={item.created_at}
              distance=""
            />
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YapsTab;
