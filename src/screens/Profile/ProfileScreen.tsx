// screens/Profile/ProfileScreen.tsx
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Switch, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../supabaseClient';
import { AuthProps, Profile, post } from '../../types/types';
import PostsTab from '../../components/postsTab';
import { useGlobalContext } from '../../contexts/GlobalContext';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isRatingVisible, setIsRatingVisible] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);
  const { state,dispatch  } = useGlobalContext();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => dispatch({ type: 'LOGOUT' })} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: 'Profile',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error('User not found');

        const { data: profileData, error: profileError } = await supabase
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileError) throw profileError;

        const { data: postsData, error: postsError } = await supabase
          .from('Posts')
          .select('*')
          .eq('owner', user.id)
          .order('created_at', { ascending: false });
        if (postsError) throw postsError;

        setProfile(profileData);
        setPosts(postsData);
      } catch (err: any) {
        console.error('Fetch Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      {/* Tabs */}
      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Posts">{() => <PostsTab posts={posts} />}</Tab.Screen>
          <Tab.Screen name="Yaps">{() => <Text style={{ padding: 20 }}>Yaps Coming Soon</Text>}</Tab.Screen>
          <Tab.Screen name="Deals">{() => <Text style={{ padding: 20 }}>Deals Coming Soon</Text>}</Tab.Screen>
        </Tab.Navigator>
      </View>
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
});

export default ProfileScreen;
