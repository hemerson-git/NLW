import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});
  const [orphanagePosition, setOrphanagePosition] = useState({ latitude: 0, longitude: 0 })

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

  function handleNextStep() {
    navigation.navigate('OrphanageData', orphanagePosition);
  }

  function handleSelectMapPosition( event: MapEvent ) {
    setOrphanagePosition(event.nativeEvent.coordinate)
  } 
  
  if(userLocation.longitude === 0 && userLocation.latitude === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small'/>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        { orphanagePosition.latitude !== 0 &&
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: orphanagePosition.latitude, longitude: orphanagePosition.longitude }}
          />
        }
      </MapView>

      { orphanagePosition.latitude !== 0 &&
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  loadingContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    alignItems: 'center',
    justifyContent: 'center'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
