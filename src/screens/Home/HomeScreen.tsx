import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         
import Yap from '../../components/Yap';
import { AuthProps } from '../../types/types';

export default function HomeScreen({ setIsLoggedIn }: AuthProps) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
      title: "🔥Campus UpDates🔥", // you said you wanted the title to still be "Hot Yap"
    });
  }, [navigation, setIsLoggedIn]);

  return (
    <View style = {styles.container}>
    <ScrollView style={styles.feed}>
    <StoryBar />
    </ScrollView>
    <View style={styles.separator} />
    <ScrollView style={styles.feed}>
      {/* Posts Feed */}
      <View style={styles.feed}>
        <Post
          title="🔥Dining Halls🔥"
          content="South Dining Hall is the Best"
          image={require('../../../assets/dining.png')} 
          likes="9.5K"
          shares="6.5K"
        />
        <Yap
          title="🔥Go Irish 🔥"
          content="We are winning the Natty this Year" 
        />
        <Post
          title="That assignment grind 😩"
          content="Me when I finally finish the assignment that's been destroying my life for weeks"
          image={require('../../../assets/Ledger.png')}
          likes="23.3K"
          shares="10.1K"
        />
        <Yap 
          title="🔥Party Life🔥"
          content="Zahm's Party Life sucks more than anything"
        />
        <Post
          title="ShamRock Series Baby"
          content="Army had no chance, Can't run it forever"
          image={require('../../../assets/Natty.png')}
          likes="23.3K"
          shares="10.1K"
        />
        <Yap 
          title="🥰Help needed😄"
          content="I need a foot massage ASAP"
        />
        <Post
          title="This Year's Outfits"
          content="I can't wait"
          image={require('../../../assets/outfit.png')}
          likes="23.3K"
          shares="10.1K"
        />
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4, // for Android shadow
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  feed: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
