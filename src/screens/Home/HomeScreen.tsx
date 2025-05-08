import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         
import Yap from '../../components/Yap';
import { AuthProps } from '../../types/types';
type HomeScreenProps = {
  setIsLoggedIn: (value: boolean) => void;
};

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
    <ScrollView style={styles.container}>
      {/* Top Stories Section */}
      <StoryBar />

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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  feed: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
