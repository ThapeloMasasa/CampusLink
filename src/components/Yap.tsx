import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type YapProps = {
  content: string;
  title: string;
};

const Yap: React.FC<YapProps> = ({ content, title }) => {
  return (
    <View style={styles.wrapper}>
         <Text style={styles.title}>{title} 🔥</Text>
      <View style={styles.bubble}>
        <Text style={styles.yapText}>{content}</Text>
      </View>
      <View style={styles.tail} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  bubble: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  yapText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
    alignSelf: 'center',
    marginTop: -2,
  }, 
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#333',
  },
});

export default Yap;
