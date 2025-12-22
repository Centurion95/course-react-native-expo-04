import { infraestructuraApi } from "../api/infraestructura-api";

export const getCatByIdAction = async (id: string) => {
  try {
    console.log('trying to get cat by id');
    const { data } = await infraestructuraApi.get(`/${id}`);
    console.log(JSON.stringify(data, null, 2));
    return data;

  } catch (error) {
    console.error(error);
    throw 'Cannot perform getCatByIdAction';
  }
};