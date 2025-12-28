import { PermissionStatus } from '@/infraestructure/interfaces/location'
import { router } from 'expo-router'
import React, { PropsWithChildren, useEffect } from 'react'
import { AppState } from 'react-native'
import { usePermissionsStore } from '../store/usePermissions'

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore()

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace('/home');
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace('/permissions');
    }
  }, [locationStatus])

  useEffect(() => {
    checkLocationPermission()
  }, [])

  //Para detectar cuando la app vuelve a primer plano
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log('AppState changed to', nextAppState); //active; background; inactive
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>
}

export default PermissionsCheckerProvider