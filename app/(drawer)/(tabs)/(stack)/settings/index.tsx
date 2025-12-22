import { useCats } from '@/presentation/hooks/useCats';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const SettingsScreen = () => {

  const { getAnimalsQuery } = useCats();

  if (getAnimalsQuery.isLoading) {
    return (
      <View className='justify-center items-center flex-1'>
        <ActivityIndicator color="blue" size={40} />
      </View>
    )
  }

  return (
    <FlatList
      data={getAnimalsQuery.data}
      keyExtractor={(cat) => cat.id}
      renderItem={({ item: cat }) => (
        <Pressable
          className='px-2 mx-3 mb-2 active:opacity-90 rounded-2xl border'
          onPress={() => router.push({ pathname: '/cats/[id]', params: { id: String(cat.id) } })}
        >
          <Text>ID: {cat.id}</Text>
          <Text>URL: {cat.url}</Text>
          <Image source={{ uri: cat.url }} className='w-full h-40' />
          <Text>Width: {cat.width}</Text>
          <Text>Height: {cat.height}</Text>
        </Pressable>
      )}
    />
  )
}

export default SettingsScreen