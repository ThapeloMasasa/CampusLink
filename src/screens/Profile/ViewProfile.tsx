import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute } from '@react-navigation/native';
import { ViewProfileRouteProp, ViewProfileNavigationProp  } from '../../types/types';
import { useNavigation } from '@react-navigation/native';



const ViewProfile = () => {
  const navigation = useNavigation<ViewProfileNavigationProp>();
  const route = useRoute<ViewProfileRouteProp>();
  const { userId } = route.params; 

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <Text style={styles.title}>Linker Profile - {userId}</Text> 
      
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/popi.jpg')} 
          style={styles.profileImage}
        />
      </View>

      {/* Rating and Social Icons Section */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>🤩1345😎</Text>
          <Text style={styles.ratingText}>Yapper Rating</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('DirectMessageScreen', { username: 'Masasa' })}>
            <Text style={styles.ratingText}>DM 😜</Text>
            <Ionicons name="chatbubble-ellipses-outline" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.ratingText}>Follow 😉</Text>
          <Image
            source={require('../../../assets/insta.png')}
            style={styles.socialIcon}
          />
        </View>

        <View>
          <Text style={styles.ratingText}>Connect 🤝</Text>
          <Image
            source={require('../../../assets/Linked.png')}
            style={styles.socialIcon}
          />
        </View>
      </View>

      {/* Posts Section */}
      <Text style={styles.postsTitle}>Posts</Text>

      {/* Posts Grid */}
      <FlatList
        data={[1, 2, 3, 4]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <View style={styles.postBox} />
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

export default ViewProfile;
