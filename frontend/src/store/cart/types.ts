/***************** State part *****************/
export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}
export interface CartItemState {
  loading?: boolean;
  error?: string;
  cartItems: CartItem[];
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

interface CartAddItemAction {
  type: typeof CART_ADD_ITEM;
  payload: CartItem;
}
interface CartRemoveItemAction {
  type: typeof CART_REMOVE_ITEM;
}
export type CartActionTypes = CartAddItemAction | CartRemoveItemAction;
/***************** end of Action part *****************/
