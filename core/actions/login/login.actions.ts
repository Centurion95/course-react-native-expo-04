import { infraestructuraApi } from "../api/infraestructura-api";

export const loginAction = async () => {
  try {
    console.log('trying to login action');
    const { data } = await infraestructuraApi.get('/search?limit=10');
    console.log(JSON.stringify(data, null, 2));
    return data;

  } catch (error) {
    console.error(error);
    throw 'Cannot perform login action';
  }
};

// export const loginAction = async (username: string, password: string) => {
//   // Simulate an API call to authenticate the user
//   return new Promise<{ success: boolean; token?: string }>((resolve) => {
//     setTimeout(() => {
//       if (username === 'admin' && password === 'password') {
//         resolve({ success: true, token: 'fake-jwt-token' });
//       } else {
//         resolve({ success: false });
//       }
//     }, 1000);
//   });
// };