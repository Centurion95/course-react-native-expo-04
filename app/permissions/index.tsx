import CustomButton from '@/components/shared/CustomButton'
import { usePermissionsStore } from '@/presentation/store/usePermissions'
import React from 'react'
import { Text, View } from 'react-native'

const PermissionScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

      <CustomButton
        className="mb-2"
        color="primary"
        onPress={requestLocationPermission}
      >
        Habilitar ubicación
      </CustomButton>

      <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}

export default PermissionScreen