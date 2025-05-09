import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import LocalDealsCard from '../../components/LocalDealsCard'
import { localDeal } from '../../types/types'

const images = {
  Dominos: require('../../../assets/Dominos.png'),
  LiqourStore: require('../../../assets/Jager.png'),
  Wingstop: require('../../../assets/wingstop.png'),
  McG: require('../../../assets/McG.png'),
  DominosLogo: require('../../../assets/dominosLogo.png'),
  LiquorStoreLogo: require('../../../assets/LiqourLogo.png'),
  McGLogo: require('../../../assets/mcGLogo.png'),
  WingstopLogo: require('../../../assets/winstopLogo.png'),
}

const deals: localDeal[] = [
  { price: '16.99', image: images.Dominos, storeLogo: images.DominosLogo, store: 'Dominos', longitude:-73.9855, latitude:40.7580 },
  { price: '49.99', image: images.LiqourStore, storeLogo: images.LiquorStoreLogo, store: 'Brandy Liqours',longitude:-73.9683, latitude:40.7851 },
  { price: '5.99', image: images.McG, storeLogo: images.McGLogo, store: 'McDonalds' ,longitude:-73.9969, latitude:40.7061},
  { price: '13.99', image: images.Wingstop, storeLogo: images.WingstopLogo, store: 'WingStop',longitude:-73.9911, latitude:40.7359 },
]

const LocalDealsScreen = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards')

  return (
    <View style={styles.container}>
      {/* Toggle Switch */}
      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'cards' && styles.activeToggle]}
          onPress={() => setViewMode('cards')}
        >
          <Text style={viewMode === 'cards' ? styles.activeText : styles.inactiveText}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'map' && styles.activeToggle]}
          onPress={() => setViewMode('map')}
        >
          <Text style={viewMode === 'map' ? styles.activeText : styles.inactiveText}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {viewMode === 'cards' ? (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {deals.map((deal, index) => (
            <TouchableOpacity key={index}>
              <LocalDealsCard
                store={deal.store}
                image={deal.image}
                price={deal.price}
                storeLogo={deal.storeLogo}
                longitude={deal.longitude}
                latitude={deal.latitude}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <MapView
  style={styles.map}
  initialRegion={{
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
  
>
  {deals.map((deal, index) => (
    <Marker
      key={index}
      coordinate={{ latitude: deal.latitude, longitude: deal.longitude }}
      title={deal.store}
      description={`$${deal.price}`}
    />
  ))}
</MapView>

      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeToggle: {
    backgroundColor: '#333',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#555',
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    color: '#888',
  },
})

export default LocalDealsScreen
