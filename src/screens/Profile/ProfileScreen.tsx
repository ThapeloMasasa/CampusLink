import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Switch, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  currentUser, post } from '../../types/types';
import PostsTab from '../../components/postsTab';
import { useGlobalContext } from '../../contexts/GlobalContext';
import YapsTab from '../../components/YapsTab';
import DealsTab from '../../components/DealsTab';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isRatingVisible, setIsRatingVisible] = useState(true);
  const [profile, setProfile] = useState<currentUser | null>(null);
  const [posts, setPosts] = useState<post[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useGlobalContext();

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
    const loadFromContext = () => {
      try {
        const userProfile = state.currentProfile;
        const allPosts = state.allPosts || [];

        if (!userProfile) throw new Error('User profile not found in context');

        const userPosts = allPosts
          .filter((p) => p.owner === userProfile.id)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setProfile(userProfile);
        setPosts(userPosts);
      } catch (err: any) {
        console.error('Context Load Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFromContext();
  }, [state]);

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
          
            <View style={styles.ratingInfo}>
              <Text style={styles.ratingNumber}>🤩 {profile?.rating ?? 0} 😎</Text>
              <Text style={styles.ratingText}>Yapper Rating</Text>
            </View>
        
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="Posts">{() => <PostsTab posts={posts} />}</Tab.Screen>
          <Tab.Screen name="Yaps">{() => <YapsTab />}</Tab.Screen>
          <Tab.Screen name="Deals">{() => <DealsTab />}</Tab.Screen>
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
