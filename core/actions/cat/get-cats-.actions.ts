import { catsApi } from "../api/cats-api";

export const getCatsAction = async () => {
  try {
    console.log('trying to getCatsAction');
    const { data } = await catsApi.get('/search?limit=10');
    console.log(JSON.stringify(data, null, 2));
    return data;

  } catch (error) {
    console.error(error);
    throw new Error("Cannot perform getCatsAction");
  }
};