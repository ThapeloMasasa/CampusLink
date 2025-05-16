import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import StoryBar from '../../components/StoryBar'; 
import Post from '../../components/Post';         
import Yap from '../../components/Yap';
import { AuthProps, post, YapType } from '../../types/types';
import { supabase } from '../../../supabaseClient';

export default function HomeScreen({ setIsLoggedIn }: AuthProps) {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<post[] | null>([])
  const [yaps, setYaps] = useState<YapType[]| null>([])
  const [homeContent, setHomeContent] = useState<any []>([])

 useEffect(()=>{
LoadContent()
 }, [])
 const LoadContent = async()=>{

    try{
      const {data:postsdata, error: postserror} = await supabase
      .from('Posts')
      .select("*")

      const {data:yapsdata, error: yapserror} = await supabase
      .from('Yaps')
      .select("*")

      setPosts(postsdata)
      setYaps(yapsdata)
      setHomeContent([...(posts || []), ...(yaps || [])])
      console.log(yapsdata)
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
  const renderPostItem = ({ item }: { item: any }) => (
    <View style={styles.post}>
      {item.yap ? (
        <Yap
          title=""
          content={item.Content}
          initialLikes={item.likes ?? 0}
          initialReactions={item.reactions ?? []}
        />
      ) : (
        <Post
          title={item.Header}
          content={item.Header}
          image={item.image ? { uri: item.image } : undefined}
          likes={item.likes ?? 0}
          reactions={item.reactions ?? []}
          mypost={false}
          userId={item.owner}
        />
      )}
    </View>
  );

  return (
    <View style = {styles.container}>
    <ScrollView style={styles.feed}>
    <StoryBar />
    </ScrollView>
    <View style={styles.separator} />
     <FlatList
                data={homeContent}
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
