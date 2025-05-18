// screens/SectionScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  RootStackParamList } from '../../types/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const sections = ['General', 'LeetCode', 'Resumes', 'Projects'];

const SectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => navigation.navigate('GroupChat', { sectionName: item })}
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
