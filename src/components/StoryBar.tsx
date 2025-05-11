import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { useState, useEffect, useRef } from 'react';

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
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Animations
  const topLineWidth = useRef(new Animated.Value(0)).current;
  const rightLineHeight = useRef(new Animated.Value(0)).current;
  const bottomLineWidth = useRef(new Animated.Value(0)).current;
  const leftLineHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      animateBorder();
    } else {
      resetAnimations();
    }
  }, [modalVisible]);

  const resetAnimations = () => {
    topLineWidth.setValue(0);
    rightLineHeight.setValue(0);
    bottomLineWidth.setValue(0);
    leftLineHeight.setValue(0);
  };

  const animateBorder = () => {
    Animated.sequence([
      Animated.timing(topLineWidth, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(rightLineHeight, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(bottomLineWidth, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(leftLineHeight, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setModalVisible(false); // After full loop, close modal
    });
  };

  const openStory = (story: any) => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  return (
    <>
      <Text style={styles.title}>MyDay</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {storyList.map((story, index) => (
          <TouchableOpacity key={index} onPress={() => openStory(story)}>
            <View style={styles.storyWrapper}>
              <Image source={story} style={styles.storyImage} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fullscreen Modal */}
      <Modal visible={modalVisible} transparent={false} animationType="fade">
  <View style={styles.modalContainer}>
    {selectedStory && (
      <View style={styles.borderContainer}>
        {/* Image inside the animated border */}
        <View style={styles.imageContainer}>
          <Image source={selectedStory} style={styles.image} resizeMode="contain" />
        </View>

        {/* Animated Borders */}
        <Animated.View style={[styles.lineHorizontal, {
          top: 0,
          left: 0,
          width: topLineWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }]} />
        <Animated.View style={[styles.lineVertical, {
          top: 0,
          right: 0,
          height: rightLineHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }]} />
        <Animated.View style={[styles.lineHorizontal, {
          bottom: 0,
          right: 0,
          width: bottomLineWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }]} />
        <Animated.View style={[styles.lineVertical, {
          bottom: 0,
          left: 0,
          height: leftLineHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }]} />
      </View>
    )}
  </View>
</Modal>

    </>
  );
}
const styles = StyleSheet.create({

    borderContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageContainer: {
        width: '100%',
        height: '100%',
        padding: 10, // extra safety so image does not touch lines
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      lineHorizontal: {
        position: 'absolute',
        height: 4,
        backgroundColor: 'white',
      },
      lineVertical: {
        position: 'absolute',
        width: 4,
        backgroundColor: 'white',
      },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    container: {
      padding: 10,
      flexDirection: 'column',  
    },
    storyWrapper: {
      borderWidth: 2,
      borderColor: 'gray',
      borderRadius: 35,
      padding: 3,
      alignSelf: 'center',
      marginVertical: 10,
    },
    storyImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenImage: {
      width: '100%',
      height: '100%',
    },
   
    
  });
  