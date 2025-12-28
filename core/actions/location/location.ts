import { LatLng } from '@/infraestructure/interfaces/lat-lng';
import * as Location from 'expo-location';

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    throw new Error('Error getting users location');
  }
};

// //esta funcion es por si necesitamos estar escuchando la ubicacion del usuario en tiempo real
// export const watchCurrentPosition = (
//   locationCallback: (location: LatLng) => void
// ) => {
//   return Location.watchPositionAsync(
//     {
//       accuracy: Location.Accuracy.Highest,
//       timeInterval: 1000,
//       distanceInterval: 10,
//     },
//     ({ coords }) => {
//       locationCallback({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//       });
//     }
//   );
// };