import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Keyboard, SafeAreaView} from 'react-native';
import Yap from '../../components/Yap';
import { YapType } from '../../types/types';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { calculateAge } from '../../utils/calculateTime';
import YapCard from '../../components/YapCard';

const YapsLeaderboard = () => {
  const [selectedYap, setSelectedYap] = useState<YapType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [yaps, setYaps] = useState<YapType[]>([]);
  const {state} = useGlobalContext();
  let countYaps = 0;

  useEffect(() => {
    LoadContent()
  }, []);
  
  const LoadContent = ()=>{

    try{
      const yapsdata = state.allYaps || null
      yapsdata.sort((a,b)=> b.score - a.score)
      setYaps(yapsdata)
     
    }catch(e){
      console.log("error")
    }
 }
  const openYapDetails = (yap: YapType) => {
    setSelectedYap(yap);
    setModalVisible(true);
  };

  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
    setSelectedYap(null);
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, { flex: 1 }]}>Rank</Text>
      <Text style={[styles.headerCell, { flex: 2 }]}>Title</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Age</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Score</Text>
    </View>
  );

  const renderItem = ({ item }: { item: YapType }) => {
    const age = calculateAge(item.created_at);
    countYaps += 1

    return (
      <TouchableOpacity style={styles.row} onPress={() => openYapDetails(item)}>
        <Text style={[styles.cell, { flex: 1 }]}>{countYaps}</Text>
        <Text style={[styles.cell, { flex: 2 }]}>{item.header}</Text>
        <Text style={[styles.cell, { flex: 1 }]}>{age}</Text>
        <Text style={[styles.cell, { flex: 1 }]}>{item.score}</Text>
      </TouchableOpacity>
    );
  };

  return (
  
    <View style={styles.container}>
      <FlatList
  ListHeaderComponent={renderHeader}
  data={yaps}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}
  keyboardShouldPersistTaps="handled"
/>
     <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal} transparent={true}>
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
    <View style={styles.modalContent}>
      {selectedYap && 
         <YapCard
                   content= {selectedYap.Content}
                   likes={42}
                   onLike={() => console.log('Liked')}
                   onDislike={() => console.log('Disliked')}
                   commentCount={7}
                   timestamp={selectedYap.created_at}
                   distance=""
/>
      }
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
</Modal>

    </View>
  );
};

// Helper to calculate age

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 10, 
},

  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    borderRadius: 6,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  backgroundColor: '#e0e0e0',
  padding: 15,
  marginVertical: 5,
  borderRadius: 8,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 10,
  },
  cell: {
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#0084ff',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YapsLeaderboard;



