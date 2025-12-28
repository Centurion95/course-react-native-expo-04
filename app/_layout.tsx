import React, { useEffect } from 'react'

import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()


import PermissionsCheckerProvider from '@/presentation/providers/PermissionsCheckerProvider'
import "./global.css"

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    'WorkSans-Black': require('../assets/fonts/WorkSans-Black.ttf'),
    'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null


  // return <Slot />

  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsCheckerProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </PermissionsCheckerProvider>
    </QueryClientProvider>
  );
}

export default RootLayout