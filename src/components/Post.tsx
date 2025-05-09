import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { PostProps } from '../types/types';
 
  
  const Post: React.FC<PostProps> = ({ title, content, image, likes, shares }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {image && <Image source={ image } style={styles.image} />}
      <View style={styles.stats}>
        <Text>😊 {likes}</Text>
        <Icon name="user-circle" size={40} color="#000" />
        <Text>📤 {shares}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    postContainer: {
      backgroundColor: '#f2f2f2',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    content: {
      fontSize: 15,
      marginBottom: 10,
      color: '#333',
    },
    image: {
      width: '100%',
      height: 180,
      borderRadius: 10,
      marginBottom: 10,
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
export default Post;