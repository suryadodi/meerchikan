import client from "@/apolloClient";
import { GET_CART_ITEMS } from "@/helpers/query";

export const fetchCartItems = async (userId: string) => {
    try {
      const response = await client.query({
        query: GET_CART_ITEMS,
        variables: { user_id: userId },
        fetchPolicy: 'no-cache',
      });
  
      return { datas: response.data, error: null };
    } catch (error) {
      return { datas: null, error: (error as Error).message };
    }
  };