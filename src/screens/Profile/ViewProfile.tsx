import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute } from '@react-navigation/native';
import { ViewProfileRouteProp, ViewProfileNavigationProp, post, currentUser  } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import Post from '../../components/Post';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Linking } from 'react-native';


const ViewProfile = () => {
  const navigation = useNavigation<ViewProfileNavigationProp>();
  const route = useRoute<ViewProfileRouteProp>();
  const { userId } = route.params; 
  const [profile, setProfile] = useState<currentUser>();
  const [posts, setPosts] = useState<post[]| null>(null)
  const {state} = useGlobalContext();
  const [linkedIn, setLinkedIn] = useState<string | undefined>('');
  const [instagram, setInstagram] = useState<string | undefined>('');


  const loadUserFromContext = (userId: string | null) => {
  try {
    const profileData = state.allProfiles?.find(profile => profile.id === userId);
    const postsData = (state.allPosts || [])
      .filter(post => post.owner === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setProfile(profileData);
    setPosts(postsData || []);
    setInstagram(profileData?.insta_url)
    setLinkedIn(profileData?.linkedIn_url)
  } catch (e) {
    console.log("Context Load Error");
  }
};
useEffect(() => {
  loadUserFromContext(userId);

}, [userId]);


  const renderPostItem = ({ item }: { item: post }) => (
  <View style ={styles.gridItem}>
  <Post
      title={item.Header}
      content={item.Header} // fallback to Header if `content` isn't available
      image={item.image ? { uri: item.image } : undefined}
      likes={item.likes ?? 0}
      reactions={item.reactions ?? []}
      mypost={true}
      userId= {item.owner}
    />
  </View>
    
);
  
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <Text style={styles.title}>{profile?.full_name}</Text> 
      
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri:profile?.avatar_url}} 
          style={styles.profileImage}
        />
      </View>

      {/* Rating and Social Icons Section */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>🤩{profile?.rating}😎</Text>
          <Text style={styles.ratingText}>Yapper Rating</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('DirectMessageScreen', { username: profile?.full_name })}>
            <Ionicons name="chatbubble-ellipses-outline" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          {instagram ?<TouchableOpacity onPress={()=>Linking.openURL(instagram)}>
              <Image
            source={require('../../../assets/insta.png')}
            style={styles.socialIcon}
          />
          </TouchableOpacity>: <></>}
        </View>

        <View>{
          linkedIn ? <TouchableOpacity onPress={() => Linking.openURL(linkedIn)}>
          <Image
            source={require('../../../assets/Linked.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>: <></>}
          
          
        </View>
      </View>

      {/* Posts Section */}
      <Text style={styles.postsTitle}>Posts</Text>

      {/* Posts Grid */}
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
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  gridItem: {
  flex: 1,
  paddingHorizontal: 8,
  margin: 8,
},
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
  },
  ratingNumber: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 5,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  postsGrid: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  postBox: {
    backgroundColor: '#d3d3d3',
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 15,
  },
});

export default ViewProfile;
