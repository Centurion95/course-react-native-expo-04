import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { infraestructuraApi } from "../api/infraestructura-api";

export const getPersonaAction = async (numero_documento: string) => {
  try {
    let token;
    if (Platform.OS === "web") {
      token = localStorage.getItem("token");
    } else {
      token = await SecureStore.getItemAsync("token");
    }

    const { data } = await infraestructuraApi.get(
      `infraestructura/obtener_datos_usuario`,
      {
        params: { numero_documento },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return data;

  } catch (error) {
    console.error(error);
    throw new Error("Cannot perform getPersonaAction");
  }
};