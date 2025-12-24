import MapView from '@/components/shared/MapView';
import React from 'react';
import { Text, View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <MapView
        style={{ width: '100%', height: 300 }}
        initialRegion={{
          latitude: -25.2637,
          longitude: -57.5759,
          latitudeDelta: 10, // zoom vertical
          longitudeDelta: 10, // zoom horizontal 
        }}
      />
    </View>
  )
}

export default ProfileScreen