import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Stories Section */}
      <StoryBar />

      {/* Posts Feed */}
      <View style={styles.feed}>
        <Post
          title="🔥 Hot Yap 🔥"
          content="South Dining Hall is the Best"
          image={require('../../../assets/dining.png')} 
          likes="9.5K"
          shares="6.5K"
        />
        <Post
          title="That assignment grind 😩"
          content="Me when I finally finish the assignment that's been destroying my life for weeks"
          image={require('../../../assets/Ledger.png')}
          likes="2.3K"
          shares="1.1K"
        />
        {/* Add more <Post /> components as needed */}
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
