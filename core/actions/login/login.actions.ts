import { infraestructuraApi } from "../api/infraestructura-api";

export const loginAction = async (numero_documento: string, password: string) => {
  try {
    const { data } = await infraestructuraApi
      .post(`auth/login`, {
        numero_documento,
        password
      });
    return data;

  } catch (error) {
    console.error(error);
    throw new Error("Cannot perform loginAction");
  }
};