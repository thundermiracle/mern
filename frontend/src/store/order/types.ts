import { CartItem } from "../cart/types";
import { ShippingAddress } from "../shipping/types";

/***************** State part *****************/
export interface Order {
  _id?: string;
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
}
export interface OrderCreateState {
  loading?: boolean;
  success?: boolean;
  error?: string;
  order?: Order;
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
interface OrderCreateRequestAction {
  type: typeof ORDER_CREATE_REQUEST;
}
interface OrderCreateSuccessAction {
  type: typeof ORDER_CREATE_SUCCESS;
  payload: Order;
}
interface OrderCreateFailAction {
  type: typeof ORDER_CREATE_FAIL;
  payload: string;
}
export type OrderCreateActionTypes =
  | OrderCreateRequestAction
  | OrderCreateSuccessAction
  | OrderCreateFailAction;
/***************** end of Action part *****************/
