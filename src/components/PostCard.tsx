import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';
import moment from 'moment';
import Avatar from './Avatar';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useGlobalContext } from '../contexts/GlobalContext';

const {width: deviceWidth, height: deviceheight} = Dimensions.get('window')
  const hp = (percentage: number) =>{
    return (percentage*deviceheight)/ 100;
}
const wp = (percentage: number) =>{
    return (percentage*deviceWidth)/ 100;
}
const PostCard: React.FC<PostProps> = ({ title, content, image, likes,  mypost, userId, createdAt }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const hasShadow = true;
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useGlobalContext();
  const [liked, setLiked] = useState(false)
  const profiles = state.allProfiles || []
  const userProfile = profiles.find(profile => profile.id === userId);
  const userDp = userProfile?.avatar_url || require('../../assets/fin.png');
  const userName = userProfile?.full_name || 'userName'
  const date = moment(createdAt).format("MMM D")
  
  const shadowStyles = {shadowOffset:{
                            width: 0,
                            height: 2
                         },
                        shadowOpacity: 0.06,
                        shadowRadius: 6,
                        elevation: 1
                        }
  const handleLikePress = () => {
    setLikeCount(prev => prev + 1);
  };
  const reactions = ['😀', '😀', '😀','😀','😀', '😡', '😡', '😡', '🎉', '🎉', '🎉', '😀', '😡', '🎉'];
  const reactionCounts = reactions.reduce((acc: Record<string, number>, emoji: string) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style = {[styles.container , hasShadow&& shadowStyles]}>
       <View style = {styles.header}>
          <View style = {styles.userInfo}>
              <Avatar
               size={hp(4.5)}
               uri ={userDp} 
               rounded= {14}/>
               <View style={{gap:2}}>
                    <Text style = {styles.username}>{userName}</Text>
                    <Text style ={styles.postTime}>{date}</Text>
               </View>
          </View>
          <TouchableOpacity>
            <Ionicons  name="ellipsis-horizontal" size={hp(3.4)}  color={'#494949'}/>
          </TouchableOpacity>
       </View>
       {/*post  body*/}
       <View style={styles.content}>
          <View style = {styles.postBody}>
              <Text >{content}</Text>
          </View>

          <Image
         source = {image}
         style = {styles.postMedia}
         contentFit ='cover'
       />
       </View>
       <View style = {styles.footer}>
        <View style = {styles.footerButton}>
            <TouchableOpacity onPress={()=>setLiked(!liked)}>
                <Ionicons   name="heart" size={24} color={liked ? '#ef4444' : '#7C7C7C'}/>
            </TouchableOpacity>
            <Text style = {styles.count}>
                {Math.floor(Math.random() * 101)}
            </Text>
        </View>
        <View style = {styles.footerButton}>
            <TouchableOpacity>
                <Ionicons   name="chatbubble-outline" size={24}/>
            </TouchableOpacity>
            <Text style = {styles.count}>
                {Math.floor(Math.random() * 101)}
            </Text>
        </View>
        <View style = {styles.footerButton}>
            <TouchableOpacity>
                <Ionicons   name="share-outline" size={24} />
            </TouchableOpacity>
            
        </View>

       </View>

    </View>
    
  )
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom:15,
        borderRadius: 22*1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor:'#e3e3e3',
        shadowColor:'#000'
     },
     header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
     },
     userInfo:{
        flexDirection:'row',
        alignItems: 'center',
        gap: 8
     },
     username:{
       fontSize: hp(1.7),
       color:'#1D1D1D',
       fontWeight: '500',
     },
     postTime:{
      fontSize: hp(1.4),
      color: '#7C7C7C',
      fontWeight:'500'

     },
     content:{
        gap: 10
     },
     postMedia:{
        height: hp(40),
        width: '100%',
        borderRadius:18,
        borderCurve: 'continuous'

     },
     postBody:{
        marginLeft:5,
     },
     footer:{
        flexDirection:'row',
        alignItems: 'center',
        gap: 15
     },
     footerButton:{
        marginLeft:5,
        flexDirection:'row',
        alignItems: 'center',
        gap: 4
     },
     actions:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
     },
     count:{
        color:'#494949',
        fontSize: hp(1.8)
     }
})

export default PostCard