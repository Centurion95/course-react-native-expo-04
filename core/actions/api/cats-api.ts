import axios from 'axios';

export const catsApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CATS_DB_URL,
  // params: {
  //   language: 'es-MX',
  //   api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  // },
});
