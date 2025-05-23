import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Text, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import { MainStackParamList } from '../../types/types';
import PostCard from '../../components/PostCard';        
import YapCard from '../../components/YapCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import NotificationsModalComponent from '../../components/NotificationsModal';
import { useGlobalContext } from '../../contexts/GlobalContext';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [homeContent, setHomeContent] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { state, dispatch } = useGlobalContext();
  const drawerTranslateX = useSharedValue(-250);
  const [toggleChev, setToggleChev] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const notifications = 6;
  const messages = 7;

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drawerTranslateX.value }],
  }));

  const toggleDrawer = () => {
    drawerTranslateX.value = withTiming(drawerTranslateX.value === 0 ? -250 : 0, { duration: 300 });
    setToggleChev(!toggleChev);
  };

  useEffect(() => {
    LoadContent();
  }, []);

  const LoadContent = async () => {
    setRefreshing(true);
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
      setRefreshing(false);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
          <Image
            source={require('../../../assets/removed_header.png')}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
          {/* Inbox Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate('InboxScreen', { userId: state.currentUserId })}
            style={{ marginHorizontal: 15 }}
          >
            <View>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
              {messages > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>5</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Bell Icon */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}  // Correctly open modal
            style={{ marginHorizontal: 15 }}
          >
            <View>
              <Ionicons name="notifications-outline" size={24} color="black" />
              {notifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>6</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity onPress={() => dispatch({ type: 'LOGOUT' })} style={{ marginLeft: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, state.isLoggedIn]);

  const renderPostItem = ({ item }: { item: any }) => (
    <View style={styles.post}>
      {item.yap ? (
        <YapCard
          content="The library smells like coffee and ambition."
          likes={42}
          onLike={() => console.log('Liked')}
          onDislike={() => console.log('Disliked')}
          commentCount={7}
          timestamp="3h ago"
          distance=""
        />
      ) : (
        <PostCard
          title={item.Header}
          content={item.Header}
          image={item.image ? { uri: item.image } : undefined}
          likes={item.likes ?? 0}
          reactions={item.reactions ?? []}
          mypost={false}
          userId={item.owner}
          createdAt={item.created_at}
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

          <FlatList
            data={homeContent}
            numColumns={1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPostItem}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
            refreshing={refreshing}
            onRefresh={LoadContent}
          />

          {/* Notifications Modal */}
          {modalVisible && (
            <NotificationsModalComponent
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          )}
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

  post: {
    paddingRight: 20,
  },

  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 120,
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
    flex: 1,
    paddingLeft:40
  },

  feed: {
    paddingTop: 10,
  },
});
