import { CartActionTypes, CartItem, CART_ADD_ITEM } from "./types";

export const addToCart = (item: CartItem): CartActionTypes => {
  return {
    type: CART_ADD_ITEM,
    payload: item,
  };
};
