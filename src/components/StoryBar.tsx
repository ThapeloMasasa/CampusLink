import { ScrollView, Image, View, Text,StyleSheet } from 'react-native';

const stories = { 
  'story1': require('../../assets/popi.jpg'),
  'story2': require('../../assets/Ledger.png'),
  'story3': require('../../assets/smart.png'),
  'story4': require('../../assets/Natty.png'),
  'story5': require('../../assets/cropped-file.jpg'),
  'story6': require('../../assets/dining.png'),
  'story7': require('../../assets/outfit.png'),
  'story8': require('../../assets/popi.jpg'),
  'story11': require('../../assets/splash-icon.png'),
  'story10': require('../../assets/icon.png'),
  'story9': require('../../assets/outfit.png'),
};

const storyList = [
  stories['story1'], 
  stories['story2'], 
  stories['story3'], 
  stories['story4'],
  stories['story5'], 
  stories['story6'], 
  stories['story7'],
  stories['story8'],
  stories['story9'],
  stories['story10'],
  stories['story11'],
];

export default function StoryBar() {
  return (
    <>
    <Text style={styles.title}>MyDays</Text>
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {storyList.map((story, index) => (
        <Image key={index} source={story} style={styles.storyImage} />
      ))}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    title:{
        fontWeight: 'bold'
    },
  container: {
    padding: 10,
    flexDirection: 'column',  
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 10,  // Space between each image vertically
    alignSelf: 'center',  // Center the images horizontally
  },
});
