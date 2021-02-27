import { ShippingActionTypes, ShippingAddress, SHIPPING_ADDRESS_ADD } from "./types";

export const addShippingAddress = (shippingAddress: ShippingAddress): ShippingActionTypes => {
  return {
    type: SHIPPING_ADDRESS_ADD,
    payload: shippingAddress,
  };
};
