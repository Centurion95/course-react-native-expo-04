import { PermissionStatus } from "@/infraestructure/interfaces/location";
import * as Location from 'expo-location';
import { Alert, Linking } from "react-native";

export const requestLocationPermission
  = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      manualPermissionRequest();
      return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
  }

export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();

  switch (status) {
    case 'granted':
      return PermissionStatus.GRANTED;
    case 'denied':
      return PermissionStatus.DENIED;
    default:
      return PermissionStatus.UNDETERMINED;
  }
}

// Esto se ejecuta si el usuario ha denegado el permiso
const manualPermissionRequest = async (): Promise<boolean> => {
  Alert.alert(
    'Permiso de ubicación necesario',
    'Para continuar debe habilitar el permiso de ubicación en los ajustes de la aplicación.',
    [
      {
        text: 'Abrir configuración',
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: 'Cancelar',
        style: 'destructive',
      }

    ]
  )
  return false
}