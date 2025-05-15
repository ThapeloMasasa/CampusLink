import React, { useState, useEffect,useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator,TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { AuthProps, Profile, post } from '../../types/types';
import { supabase } from '../../../supabaseClient';
import Post from '../../components/Post';


const ProfileScreen = ({ setIsLoggedIn }: AuthProps) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [isRatingVisible, setIsRatingVisible] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'Profile',
    });
  }, [navigation, setIsLoggedIn]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error('User not found');

      const { data: profileData, error: profileError } = await supabase
        .from('Profile')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileError) throw profileError;
      console.log(profileError)
      const { data: postsData, error: postsError } = await supabase
        .from('Posts')
        .select('*')
        .eq('owner', user.id)
        .order('created_at', { ascending: false });
      if (postsError) throw postsError;
      console.log("profile",profileData)
      setProfile(profileData);
      setPosts(postsData);
    } catch (err: any) {
      console.error('Fetch Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPostItem = ({ item }: { item: post }) => (
  <View style ={styles.gridItem}>
  <Post
      title={item.Header}
      content={item.Header} // fallback to Header if `content` isn't available
      image={item.image ? { uri: item.image } : undefined}
      likes={item.likes ?? 0}
      reactions={item.reactions ?? []}
      mypost={true}
      userId={item.id}
    />
  </View>
    
);


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{profile?.full_name}</Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={
            profile?.avatar_url
              ? { uri: profile.avatar_url }
              : require('../../../assets/cropped-file.jpg')
          }
          style={styles.profileImage}
        />
      </View>

      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          {isRatingVisible && (
            <View style={styles.ratingInfo}>
              <Text style={styles.ratingNumber}>🤩 {profile?.rating ?? 0} 😎</Text>
              <Text style={styles.ratingText}>Yapper Rating</Text>
            </View>
          )}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Show Public</Text>
            <Switch value={isRatingVisible} onValueChange={setIsRatingVisible} />
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {['Posts', 'Yaps', 'Deals'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.activeTabButtonText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
  data={posts}
  numColumns={2}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderPostItem}
  contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  profileImageContainer: { alignItems: 'center', marginVertical: 20 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  ratingSection: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
  },
  gridItem: {
  flex: 1,
  paddingHorizontal: 8,
  margin: 8,
},

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ratingInfo: { alignItems: 'center' },
  ratingText: { fontWeight: 'bold', marginTop: 5 },
  ratingNumber: { fontWeight: 'bold', fontSize: 16 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  switchLabel: { marginRight: 8, fontSize: 14 },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeTabButton: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  postsGrid: {
    paddingHorizontal: 10,
  },
  postBox: {
    backgroundColor: '#d3d3d3',
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 15,
  },
});

export default ProfileScreen;