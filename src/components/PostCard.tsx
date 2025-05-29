import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView, Dimensions, KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback} from 'react-native';
import ProfileIcon from './ProfileIcon';
import { PostProps } from '../types/types';
import { useNavigation } from '@react-navigation/native';
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
  const hasShadow = true;
  const { state } = useGlobalContext();
  const [numLikes, setNumLikes] = useState(likes)
  const [liked, setLiked] = useState(false)
  const profiles = state.allProfiles || []
  const userProfile = profiles.find(profile => profile.id === userId);
  const userDp = userProfile?.avatar_url || require('../../assets/fin.png');
  const userName = userProfile?.full_name || 'userName'
  const date = moment(createdAt).format("MMM D")
  const [commentsVisible, setCommentsVisible] = useState(false);

const dummyComments = [
  {
    id: 1,
    name: 'Alice',
    text: 'Great post!',
    replies: [
      { id: '1-1', name: 'You', text: 'Thanks a lot! 😊' },
      { id: '1-2', name: 'Bob', text: 'Agreed!' },
    ],
  },
  {
    id: 2,
    name: 'Charlie',
    text: 'Amazing insight, thanks for sharing!',
    replies: [],
  },
  {
    id: 3,
    name: 'Dana',
    text: 'This made my day better 😊',
    replies: [
      { id: '3-1', name: 'You', text: 'Happy to hear that!' },
    ],
  },
];


  const shadowStyles = {shadowOffset:{
                            width: 0,
                            height: 2
                         },
                        shadowOpacity: 0.06,
                        shadowRadius: 6,
                        elevation: 1
                        }
  const handleLikePress = () => {
   if (liked){
    setNumLikes(numLikes - 1);
   }else{
    setNumLikes(numLikes + 1);
   }
   setLiked(!liked);
    
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
              <ProfileIcon userId={userId}/>
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
            <TouchableOpacity onPress={()=>handleLikePress()}>
                <Ionicons   name="heart" size={24} color={liked ? '#ef4444' : '#7C7C7C'}/>
            </TouchableOpacity>
            <Text style = {styles.count}>
                {numLikes}
            </Text>
        </View>
        <View style = {styles.footerButton}>
            <TouchableOpacity onPress={() => setCommentsVisible(true)}>
                <Ionicons name="chatbubble-outline" size={24} />
            </TouchableOpacity>

            <Text style = {styles.count}>
                {}
            </Text>
        </View>
        <View style = {styles.footerButton}>
            <TouchableOpacity>
                <Ionicons   name="share-outline" size={24} />
            </TouchableOpacity>
            
        </View>

       </View>
       <Modal visible={commentsVisible} animationType="slide" transparent>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
       <Text style={styles.modalTitle}>Comments</Text>
        <Pressable onPress={() => setCommentsVisible(false)}>
          <Ionicons name="close" size={24} color="#000" />
        </Pressable>
      </View>
      <ScrollView style={styles.commentsList}>
        {dummyComments.map(comment => (
  <View key={comment.id} style={styles.commentCard}>
    <Text style={styles.commentName}>{comment.name}</Text>
    <Text style={styles.commentText}>{comment.text}</Text>

    {comment.replies.length > 0 && (
      <View style={styles.repliesContainer}>
        {comment.replies.map(reply => (
          <View key={reply.id} style={styles.replyCard}>
            <Text style={styles.replyName}>{reply.name}</Text>
            <Text style={styles.replyText}>{reply.text}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
))}
      </ScrollView>
    </View>
  </View>
</Modal>


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
     repliesContainer: {
  marginTop: 8,
  paddingLeft: 16,
  borderLeftWidth: 2,
  borderLeftColor: '#e5e7eb',
  gap: 8,
},
replyCard: {
  backgroundColor: '#f9fafb',
  padding: 8,
  borderRadius: 8,
},
replyName: {
  fontWeight: '600',
  fontSize: 13,
  marginBottom: 2,
},
replyText: {
  fontSize: 13,
  color: '#333',
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
     modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  commentsList: {
    paddingBottom: 10,
  },
  commentCard: {
    marginBottom: 12,
    backgroundColor: '#f4f4f5',
    padding: 10,
    borderRadius: 10,
  },
  commentName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: {
    color: '#333',
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