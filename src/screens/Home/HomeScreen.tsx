import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         
import Yap from '../../components/Yap';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { useGlobalContext } from '../../contexts/GlobalContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [homeContent, setHomeContent] = useState<any []>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { state,dispatch  } = useGlobalContext();
  const drawerTranslateX = useSharedValue(-250);
  const [toggleChev, setToggleChev] = useState(false)

const drawerStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: drawerTranslateX.value }],
}));

const toggleDrawer = () => {
  drawerTranslateX.value = withTiming(drawerTranslateX.value === 0 ? -250 : 0, { duration: 300 });
  setToggleChev(!toggleChev)
};


 useEffect(()=>{
  
    LoadContent()
  setLoading(false)
 }, [])
 const LoadContent = () => {
  setLoading(true);

  try {
    const postsdata = state.allPosts || [];
    const yapsdata = state.allYaps || [];

    const hotyaps = yapsdata.filter(item => item.likes > 15);

    const combinedContent = [...postsdata, ...hotyaps];

    combinedContent.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setHomeContent(combinedContent);
  } catch (e) {
    console.log("Error loading content from context:", e);
  } finally {
    setLoading(false);
  }
};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch({ type: 'LOGOUT' })} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, state.isLoggedIn]);
  const renderPostItem = ({ item }: { item: any }) => (
    <View style={styles.post}>
      {item.yap ? (
        <Yap
          title=""
          content={item.Content}
          initialLikes={item.likes ?? 0}
          initialReactions={item.reactions ?? []}
        />
      ) : (
        <Post
          title={item.Header}
          content={item.Header}
          image={item.image ? { uri: item.image } : undefined}
          likes={item.likes ?? 0}
          reactions={item.reactions ?? []}
          mypost={false}
          userId={item.owner}
        />
      )}
    </View>
  );
return (
  <View style={styles.container}>
    {loading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    ) : (
      <>
        <>
  <TouchableOpacity onPress={toggleDrawer} style={styles.drawerToggle}>
    <Ionicons
  name={toggleChev ? 'chevron-back' : 'menu'}
  size={24}
  color="black"
/>

  </TouchableOpacity>

  <Animated.View style={[styles.drawer, drawerStyle]}>
    <StoryBar />
  </Animated.View>
</>

        <View style={styles.separator} />
        <FlatList
          data={homeContent}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        />
      </>
    )}
  </View>
);

}


const styles = StyleSheet.create({
  horizontalSeparator: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 2, 
  width: '100%',
},

  separator: {
    width: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4, 
  },

  loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  post :{
    paddingRight:20,
  
  },
  drawer: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 150,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 10,
  paddingTop: 50,
  borderRightWidth: 1,
  borderRightColor: '#ccc',
},

drawerToggle: {
  position: 'absolute',
  top: 40,
  left: 10,
  zIndex: 20,
},

  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  feed: {
    paddingTop: 10,
  },
});
