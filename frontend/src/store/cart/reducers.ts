import { CartActionTypes, CartItemState, CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types";

const initState: CartItemState = {
  cartItems: [],
};

export const cartReducer = (state: CartItemState = initState, action: CartActionTypes) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemAdded = action.payload;
      const existItem = state.cartItems.find((item) => item._id === itemAdded._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item._id === existItem._id ? itemAdded : item)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdded],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};
