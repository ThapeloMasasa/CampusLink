import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         
import Yap from '../../components/Yap';
import { AuthProps, post } from '../../types/types';
import { supabase } from '../../../supabaseClient';

export default function HomeScreen({ setIsLoggedIn }: AuthProps) {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<post[] | null>([])

 useEffect(()=>{
LoadContent()
 }, [])
 const LoadContent = async()=>{

    try{
      const {data:posts, error: postserror} = await supabase
      .from('Posts')
      .select("*")
      console.log(posts?.length)
      setPosts(posts)
    }catch(e){
      console.log("error")
    }
 }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={{ marginRight: 15 }}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, setIsLoggedIn]);
  const renderPostItem = ({ item }: { item: post }) => (
    <View style={styles.post}>
  <Post
      title={item.Header}
      content={item.Header} // fallback to Header if `content` isn't available
      image={item.image ? { uri: item.image } : undefined}
      likes={item.likes ?? 0}
      reactions={item.reactions ?? []}
      mypost={false}
      userId={item.owner}
    />
    </View>
    
);

  return (
    <View style = {styles.container}>
    <ScrollView style={styles.feed}>
    <StoryBar />
    </ScrollView>
    <View style={styles.separator} />
     <FlatList
                data={posts}
                numColumns={1}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPostItem}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
               />
        
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
  post :{
    paddingRight:20,
  
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  feed: {
    
    paddingTop: 10,
  },
});
