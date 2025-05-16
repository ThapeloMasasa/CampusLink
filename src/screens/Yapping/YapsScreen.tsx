import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for the plus icon
import Yap from '../../components/Yap';
import { YapType } from '../../types/types';
import { supabase } from '../../../supabaseClient';

const YapsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [yapText, setYapText] = useState('');
  const [yapTitle, setYapTitle] = useState('');
  const [yaps, setYaps] = useState<YapType[]| null>([])
  let countid = 0
  useEffect(()=>{
    LoadContent()
  },[])

const LoadContent = async()=>{

    try{
      const {data:yapsdata, error: yapserror} = await supabase
      .from('Yaps')
      .select("*")

      setYaps(yapsdata)
     
    }catch(e){
      console.log("error")
    }
 }
  
  
  const handlePostYap = () => {
    if (yapTitle.trim() && yapText.trim()) {
      countid += 1
      setYaps([{ id:countid.toString(), title: yapTitle, createdAt: Date.now().toString(), Content: yapText, yap: true, likes:0, reactions: [], score:0 }, ...(yaps || [])]);
      setYapTitle('');
      setYapText('');``
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
      {/* Scrollable list of Yaps */}
      <ScrollView>
  <TouchableOpacity>
    {yaps?.map((yap, index) => (
      <View key={index}> 
        <Yap title={yap.title} content={yap?.Content} />
        <View style={styles.separator} />
      </View>
    ))}
  </TouchableOpacity>
</ScrollView>

      <View>
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.add}>🗣️Add Yap🗣️</Text>
      </View>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>New Yap</Text>
            <TextInput
              style={styles.input}
              placeholder="Title..."
              value={yapTitle}
              onChangeText={setYapTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Type your yap..."
              value={yapText}
              onChangeText={setYapText}
              multiline
            />
           <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.postButton} onPress={handlePostYap}>
              <Text style={styles.postButtonText}>Post Yap</Text>
                </TouchableOpacity>
          </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  add: {
    position: 'absolute',
    bottom: 25,
    right: 5,
    fontWeight: 'bold',
    fontSize:17,


  },
  separator: {
  height: 1,  
  backgroundColor: '#ccc', 
  marginVertical: 10, 
  width: '100%', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 }, 
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2, 
},


  fab: {
    position: 'absolute',
    bottom: 55,
    right: 27,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    height: 350,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 15,
  },buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  cancelButton: {
    backgroundColor: '#FF3B30', // red
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  
  postButton: {
    backgroundColor: '#180bc6', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  
});

export default YapsScreen;
