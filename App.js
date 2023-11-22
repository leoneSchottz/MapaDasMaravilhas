import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function App() {
  const [region, setRegion] = useState({
    latitude: -14.2350, // Latitude central inicial
    longitude: -51.9253, // Longitude central inicial
    latitudeDelta: 60,
    longitudeDelta: 60,
  });

  const wonders = [    
    {
      name: 'Chichén Itzá',
      country: 'Mexico',
      flag: '🇲🇽',
      coordinates: { latitude: 20.6830, longitude: -88.5713 },
    },
    {
      name: 'Cristo Redentor',
      country: 'Brazil',
      flag: '🇧🇷',
      coordinates: { latitude: -22.9519, longitude: -43.1658 },
    },
    {
      name: 'Machu Picchu',
      country: 'Peru',
      flag: '🇵🇪',
      coordinates: { latitude: -13.1631, longitude: -72.5450 },
    },
    {
      name: 'Ruínas de Petra',
      country: 'Jordan',
      flag: '🇯🇴',
      coordinates: { latitude: 30.3285, longitude: 35.4428 },
    },
    {
      name: 'Coliseu',
      country: 'Italy',
      flag: '🇮🇹',
      coordinates: { latitude: 41.8902, longitude: 12.4922 },
    },
    {
      name: 'Taj Mahal',
      country: 'India',
      flag: '🇮🇳',
      coordinates: { latitude: 27.1750, longitude: 78.0422 },
    },
    {
      name: 'Grande Muralha da China',
      country: 'China',
      flag: '🇨🇳',
      coordinates: { latitude: 40.4319, longitude: 116.5704 },
    },
  ];

  useEffect(() => {
    // Solicitar permissões de localização
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Obter a localização do usuário
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setRegion({ ...region, latitude, longitude });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Permissão de localização negada');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();
  }, []); // Executa apenas uma vez no início

  const moveToWonder = (coordinates) => {
    setRegion({ ...region, ...coordinates });
  };

  return (
    <View style={styles.container}>
  <MapView style={styles.map} region={region}>
    {wonders.map((wonder, index) => (
      <Marker
        key={index}
        coordinate={wonder.coordinates}
        title={wonder.name}
        description={wonder.country}
      />
    ))}
  </MapView>

  {/* Buttons for the 7 wonders */}
  <View style={styles.buttonContainer}>
    {wonders.map((wonder, index) => (
      <Button
        key={index}
        title={`${wonder.flag} ${wonder.name}`}
        buttonStyle={styles.button}
        onPress={() => moveToWonder(wonder.coordinates)}
      />
    ))}
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 120, // Espaço superior
    marginBottom: 100, // Espaço inferior
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    margin: 5,
    backgroundColor: 'black',
    borderRadius: 9,
  },
});