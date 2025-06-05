import React, { useEffect, useLayoutEffect, useState, useRef, } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Text, Animated as animation, Image,  Modal, Pressable, TouchableWithoutFeedback,} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import { MainStackParamList, YapType } from '../../types/types';
import PostCard from '../../components/PostCard';        
import YapCard from '../../components/YapCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import NotificationsModalComponent from '../../components/NotificationsModal';
import { useGlobalContext } from '../../contexts/GlobalContext';

const notificationList = [
  { id: '1', message: 'John liked your post.' },
  { id: '2', message: 'New message from Sarah.' },
  { id: '3', message: 'Your story was viewed 20 times.' },
];

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
  const scrollY = useRef(new animation.Value(0)).current;

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
            testID="chat-icon"
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
            testID ='bell-icon'
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
          <TouchableOpacity testID='logout-icon' onPress={() => dispatch({ type: 'LOGOUT' })} style={{ marginLeft: 15 }}>
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
          hasImage = {item.has_image}
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
        mediaType={item.mediaType}
        scrollY={scrollY}
        content={item.Header}
        image={item.image ? { uri: item.image } : undefined}
        likes={item.likes ?? 0}
        reactions={item.reactions ?? []}
        mypost={true}
        userId={item.id}
        createdAt={item.created_at}
      />
      )}
    </View>
  );
 return (
  <View style={styles.container}>
    {loading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" testID = 'ActivityIndicator'/>
      </View>
    ) : (
      <>
        {/* Drawer Toggle Button */}
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerToggle}>
          <Ionicons
            name={toggleChev ? 'chevron-back' : 'menu'}
            size={24}
            color="black"
          />
        </TouchableOpacity>

        {/* Animated Drawer */}
        <Animated.View style={[styles.drawer, drawerStyle]}>
          <StoryBar />
        </Animated.View>

        {/* Feed */}
        <FlatList
          data={homeContent}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
          refreshing={refreshing}
          onRefresh={LoadContent}
        />
      </>
    )}

    {/* Notifications Modal - Not affected by drawer animation */}
    {modalVisible && (
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.backdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.title}>Notifications</Text>
                  <FlatList
                    data={notificationList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.notificationItem}>
                        <Text>{item.message}</Text>
                      </View>
                    )}
                  />
                  <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={{ color: '#fff' }}>Close</Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
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
 backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // margin around modal
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: 650,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  notificationItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
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
    paddingLeft: 25
  },

  feed: {
    paddingTop: 10,
  },
});
