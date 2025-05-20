
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SectionScreenProps } from '../../types/types';

const SectionScreen = ({ route, navigation }: SectionScreenProps) => {
  const { group } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={group.sections}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() =>
              navigation.navigate('GroupChat', {
                section: item,
                groupName: group.name,
              })
            }
          >
            <Text style={styles.sectionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 20 },
  sectionButton: {
    padding: 15,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    marginVertical: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SectionScreen;
