import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../../../supabaseClient';
import { Profile, post } from '../../types/types';


const MyProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProfileAndPosts();
  }, []);

  const fetchProfileAndPosts = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw userError || new Error('User not found');

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;
      alert("Success")
      setProfile(profileData);
      setPosts(postsData);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linker Profil</Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={profile?.avatar_url ? { uri: profile.avatar_url } : require('../../../assets/cropped-file.jpg')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>🤩 121 😎</Text>
          <Text style={styles.ratingText}>Yapper Rating</Text>
        </View>
      </View>

      <Text style={styles.postsTitle}>Posts</Text>

      <FlatList
        data={posts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postBox}>
            <Text>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.postsGrid}
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

export default MyProfile;
