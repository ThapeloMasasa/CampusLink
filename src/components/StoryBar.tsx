import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function StoryBar() {
  const { state } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStories, setCurrentStories] = useState<any[]>([]);
  const progressBars = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (!modalVisible) return;

    if (currentStoryIndex < currentStories.length) {
      playStories();
    } else {
      setModalVisible(false);
      setCurrentStoryIndex(0);
    }
  }, [currentStoryIndex, modalVisible]);

  const resetProgressBars = () => {
    progressBars.current.forEach(bar => bar.setValue(0));
  };

  const playStories = () => {
    if (currentStoryIndex >= currentStories.length) {
      setModalVisible(false);
      setCurrentStoryIndex(0);
      return;
    }

    Animated.timing(progressBars.current[currentStoryIndex], {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        setCurrentStoryIndex(prev => prev + 1);
      }, 50);
    });
  };

  const openUserStories = (userStories: any[]) => {
    setCurrentStories(userStories);
    progressBars.current = userStories.map(() => new Animated.Value(0));
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
              {/* Progress Bars */}
              <View style={styles.progressBarContainer}>
                {currentStories.map((_, i) => (
                  <View key={i} style={styles.progressBarBackground}>
                    <Animated.View
                      style={[
                        styles.progressBarForeground,
                        {
                          width: progressBars.current[i]?.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }) || '0%',
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>

              {/* Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: currentStories[currentStoryIndex].image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
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
  progressBarContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  progressBarForeground: {
    height: 4,
    backgroundColor: '#fff',
  },
});
