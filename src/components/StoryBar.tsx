import { ScrollView, Image, View, StyleSheet } from 'react-native';


const stories = { 'story1': require('../../assets/popi.jpg'),
                  'story2': require('../../assets/Ledger.png'),
                  'story3': require('../../assets/smart.png'),
                  'story4': require('../../assets/Natty.png'),
                  'story5': require('../../assets/cropped-file.jpg'),
                  'story6': require('../../assets/dining.png'),
                  'story7': require('../../assets/outfit.png'),


};
const storyList = [stories['story1'], stories['story2'], stories['story3'] , stories['story4'],stories['story5'], stories['story6'], stories['story7']]
export default function StoryBar() {
    
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {storyList.map((story, index) => (
        <Image key={index} source={story} style={styles.storyImage} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
  },
});
