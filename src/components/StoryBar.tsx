import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function StoryBar() {
  const { state } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStories, setCurrentStories] = useState<any[]>([]);

  const topLineWidth = useRef(new Animated.Value(0)).current;
  const rightLineHeight = useRef(new Animated.Value(0)).current;
  const bottomLineWidth = useRef(new Animated.Value(0)).current;
  const leftLineHeight = useRef(new Animated.Value(0)).current;
  console.log(state.allMydays)
  useEffect(() => {
    if (modalVisible) {
      playStories();
    } else {
      resetAnimations();
    }
  }, [modalVisible]);
  useEffect(() => {
  if (!modalVisible) return;

  if (currentStoryIndex < currentStories.length) {
    playStories();
  } else {
    setModalVisible(false);
    setCurrentStoryIndex(0);
  }
}, [currentStoryIndex]);


  const resetAnimations = () => {
    topLineWidth.setValue(0);
    rightLineHeight.setValue(0);
    bottomLineWidth.setValue(0);
    leftLineHeight.setValue(0);
  };

  const playStories = () => {
    if (currentStoryIndex < currentStories.length) {
      animateBorder(() => {
        setCurrentStoryIndex((prev) => prev + 1);
      });
    } else {
      setModalVisible(false);
      setCurrentStoryIndex(0);
    }
  };

  useEffect(() => {
    if (modalVisible && currentStoryIndex < currentStories.length) {
      playStories();
    }
  }, [currentStoryIndex]);

  const animateBorder = (onComplete: () => void) => {
    Animated.sequence([
      Animated.timing(topLineWidth, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(rightLineHeight, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(bottomLineWidth, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(leftLineHeight, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      resetAnimations();
      onComplete();
    });
  };

  const openUserStories = (userStories: any[]) => {
    setCurrentStories(userStories);
    setCurrentStoryIndex(0);
    setModalVisible(true);
  };

  return (
    <>
      <Text style={styles.title}>Scenes</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {state.allMydays?.map((userStories, index) => (
          <TouchableOpacity key={index} onPress={() => openUserStories(userStories.slice(1))}>
            <View style={styles.storyWrapper}>
              <Image source={{ uri: userStories[0]?.image }} style={styles.storyImage} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent={false} animationType="fade">
        <View style={styles.modalContainer}>
          {currentStories[currentStoryIndex] && (
            <View style={styles.borderContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: currentStories[currentStoryIndex].image }}
                  style={styles.image}
                  resizeMode="contain"
                />
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 15
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
    padding: 10,
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
});
