import { useCat } from '@/presentation/hooks/useCat';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const { catQuery } = useCat(String(id));

  const cat = catQuery.data;
  const breed = cat?.breeds?.[0];

  if (catQuery.isLoading) {
    return (
      <View className='justify-center items-center flex-1'>
        <ActivityIndicator color="blue" size={40} />
      </View>
    )
  }

  if (catQuery.isError) {
    return (
      <View className='justify-center items-center flex-1'>
        <Text>Error loading cat details.</Text>
      </View>
    )
  }

  return (
    <ScrollView className="px-5 mt-2">
      {cat ? (
        <>
          <Image source={{ uri: cat.url }} className="w-full h-64 rounded-lg mb-4" />
          <Text className="font-bold text-xl mb-1">Categoría: {cat.categories?.[0]?.name ?? '—'}</Text>
          <Text className="font-bold text-xl mb-1">Raza: {breed?.name ?? '—'}</Text>
          <Text>Origen: {breed?.origin ?? '—'}</Text>
          <Text>Temperamento: {breed?.temperament ?? '—'}</Text>
          <Text>Tamaño (kg): {breed?.weight?.metric ?? '—'}</Text>
          <Text>Esperanza de vida: {breed?.life_span ?? '—'} años</Text>
          <Text className="mt-2">{breed?.description ?? '—'}</Text>
        </>
      ) : null}
    </ScrollView>
  );
};
export default ProductScreen;