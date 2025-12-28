import MapView from '@/components/shared/MapView';
import { getCurrentLocation } from '@/core/actions/location/location';
import { LatLng } from '@/infraestructure/interfaces/lat-lng';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';

const ProfileScreen = () => {

  // const { lastKnownLocation, getLocation } = useLocationStore();

  // useEffect(() => {
  //   if (lastKnownLocation === null) {
  //     getLocation();
  //   }
  // }, []);

  const getLocation = async () => {
    return await getCurrentLocation();

  }

  const [location, setLocation] = React.useState<LatLng | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const loc = await getLocation();
      setLocation(loc);
    };
    
    fetchLocation();
  }, []);



  // if (lastKnownLocation === null) {
  if (location === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Obteniendo ubicación...</Text>
      </View>
    )
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <MapView
        // showsPointsOfInterest={false}
        // provider="google"
        // showsUserLocation={true}
        showsUserLocation={true}
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          // latitude: -25.2637,
          // longitude: -57.5759,
          // latitudeDelta: 10, // zoom vertical
          // longitudeDelta: 10, // zoom horizontal 

          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922, // zoom vertical
          longitudeDelta: 0.0421, // zoom horizontal 
        }}>
        <Marker
          coordinate={{
            latitude: -25.2637,
            longitude: -57.5759,
          }}
          title="Marker Title"
          description="Marker Description"
        />

        <Marker
          coordinate={{
            latitude: -25.4637,
            longitude: -57.7759,
          }}
          title="Ejemplo"
          description="Solo para probar"
        />
      </MapView>
    </View>
  )
}

export default ProfileScreen