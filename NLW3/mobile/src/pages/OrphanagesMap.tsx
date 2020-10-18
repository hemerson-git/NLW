import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import * as Location from 'expo-location';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function OrphanagesMap () {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]) 
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});
  
  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  });
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        // latitude e longitude do centro da cidade para facilitar mesmo com a permissão negada

        setUserLocation({ latitude: -14.8539743, longitude: -40.8433387 });
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude })
    })();
  }, []);
  
  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }
  
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }
  
  if(userLocation.longitude === 0 && userLocation.latitude === 0) {
    return (
      <ActivityIndicator size='small'/>
    )
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker 
            key={orphanage.id}
            icon={mapMarker} 
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude
            }}

            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} Orfanatos Encontrados</Text>

            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name='plus' size={20} color='#fff'/>
          </RectButton> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,

    alignItems: 'center',
    justifyContent: 'center'
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c4d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
})
