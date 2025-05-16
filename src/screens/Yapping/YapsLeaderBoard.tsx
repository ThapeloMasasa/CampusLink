import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native';
import Yap from '../../components/Yap';
import { YapType } from '../../types/types';

const dummyYaps: YapType[] = [
  {
    id: '1', title: 'Best Yap', Content: 'Learn how to choose and use', createdAt: new Date(Date.now() - 100000).toISOString(), likes: 10, score: 120,
    yap: true
  },
  { id: '2', title: 'Cold Yap', Content: 'Hello', createdAt: new Date(Date.now() - 500000).toISOString(), likes: 3, score: 102 ,  yap: true},
  { id: '3', title: 'Medium Yap', Content: 'warriors Suck', createdAt: new Date(Date.now() - 1000000).toISOString(), likes: 5, score: 90,  yap: true},
  { id: '4', title: 'Warm Yap', Content: 'Go Irish', createdAt: new Date(Date.now() - 2000000).toISOString(), likes: 8, score: 83,  yap: true },
  { id: '5', title: 'Trip', Content: 'Chicago trip this weekend', createdAt: new Date(Date.now() - 3000000).toISOString(), likes: 12, score: 75 ,  yap: true},
  { id: '6', title: 'AC', Content: 'We need more AC', createdAt: new Date(Date.now() - 3500000).toISOString(), likes: 11, score: 74 ,  yap: true},
  { id: '7', title: 'Bowling', Content: 'Bowling Anyone??', createdAt: new Date(Date.now() - 4000000).toISOString(), likes: 9, score: 60 ,  yap: true},
  { id: '8', title: 'Hype', Content: 'lets goo', createdAt: new Date(Date.now() - 4500000).toISOString(), likes: 7, score: 56 ,  yap: true},
];

const YapsLeaderboard = () => {
  const [selectedYap, setSelectedYap] = useState<YapType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [yaps, setYaps] = useState<YapType[]>([]);

  useEffect(() => {
    setYaps(dummyYaps);
  }, []);

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
    const age = calculateYapAge(item.createdAt);
    return (
      <TouchableOpacity style={styles.row} onPress={() => openYapDetails(item)}>
        <Text style={[styles.cell, { flex: 1 }]}>{item.id}</Text>
        <Text style={[styles.cell, { flex: 2 }]}>{item.title}</Text>
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
        contentContainerStyle={{ paddingTop: 10}}
      />
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        {selectedYap && 
          <Yap
                title={selectedYap.title}
                content={selectedYap.Content}
                initialLikes={selectedYap.likes}
                initialReactions={selectedYap.reactions || []}
              />}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
              </View>
          </View>
      </Modal>
    </View>
  );
};

// Helper to calculate age
const calculateYapAge = (createdAt: string) => {
  const secondsAgo = (Date.now() - new Date(createdAt).getTime()) / 1000;
  if (secondsAgo < 60) return `${Math.floor(secondsAgo)}s`;
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)}d`;
  return `${Math.floor(secondsAgo / 604800)}w`;
};

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



