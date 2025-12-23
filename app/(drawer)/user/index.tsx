import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const UserScreen = () => {
  const [myKey, setMyKey] = useState('');

  useEffect(() => {
    const getKey = async () => {
      try {
        const value = await SecureStore.getItemAsync('myKey');
        setMyKey(value || '');
        // manejar value (null si no existe)
        console.log('stored value', value);
      } catch (err) {
        console.error('SecureStore error', err);
      }
    };

    getKey();
  }, []);

  return (
    <View>
      <Text>UserScreen</Text>
      <Text>AsyncStorage</Text>
      <Text className='font-work-black'>myKey: {myKey}</Text>
    </View>
  );
};
export default UserScreen;