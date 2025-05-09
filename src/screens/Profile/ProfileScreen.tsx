import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Switch } from 'react-native';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [isRatingVisible, setIsRatingVisible] = useState(true);

  const renderPostItem = () => <View style={styles.postBox} />;

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <Text style={styles.title}>Linker Profile</Text>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/cropped-file.jpg')}
          style={styles.profileImage}
        />
      </View>

      {/* Rating Section */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          {isRatingVisible && (
            <View style={styles.ratingInfo}>
              <Text style={styles.ratingNumber}>🤩1345😎</Text>
              <Text style={styles.ratingText}>Yapper Rating</Text>
            </View>
          )}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Show Public</Text>
            <Switch
              value={isRatingVisible}
              onValueChange={setIsRatingVisible}
            />
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Posts', 'Yaps', 'Deals'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab && styles.activeTabButtonText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content under Tabs */}
      <FlatList
        data={[1, 2, 3, 4]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={styles.postsGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  ratingSection: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ratingInfo: {
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  ratingNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeTabButton: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  postsGrid: {
    paddingHorizontal: 10,
  },
  postBox: {
    backgroundColor: '#d3d3d3',
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 15,
  },
});

export default ProfileScreen;
