import { CartActionTypes, CartItem, CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types";

export const addToCart = (item: CartItem): CartActionTypes => {
  return {
    type: CART_ADD_ITEM,
    payload: item,
  };
};

export const removeFromCart = (item: CartItem): CartActionTypes => {
  return {
    type: CART_REMOVE_ITEM,
    payload: item,
  };
};
