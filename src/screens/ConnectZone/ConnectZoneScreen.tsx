import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GroupCard from '../../components/GroupCard';
import { groupItem, RootStackParamList   } from '../../types/types';

type ConnectZoneNavigationProp = StackNavigationProp<RootStackParamList, 'ConnectZone', 'GroupChat'>;


const images = {'CS': require('../../../assets/CS.png'),
                'fin': require('../../../assets/fin.png'),
                'law': require('../../../assets/law.png'),
                'socio': require('../../../assets/socio.png'),
                
}
const groups: groupItem[] = [
  { name: 'Computer Science', image: images['CS'] },
  { name: 'Finance', image: images['fin'] },
  { name: 'Law', image: images['law'] },
  { name: 'Sociology', image: images['socio'] },
];
const ConnectZoneScreen = () => {
  const navigation = useNavigation<ConnectZoneNavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
          >
           <GroupCard
                groupName= {item.name}
                isOpen={false}
                onPress={() => navigation.navigate('SectionScreen', { groupName: item.name })}
                backgroundImage={item.image}
/>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  groupCard: {
    backgroundColor: '#e0cfcf',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  groupText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConnectZoneScreen;
