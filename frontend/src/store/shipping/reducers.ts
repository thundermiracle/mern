import { ShippingActionTypes, ShippingAddressState, SHIPPING_ADDRESS_ADD } from "./types";

const initState: ShippingAddressState = {};

export const shippingReducer = (
  state: ShippingAddressState = initState,
  action: ShippingActionTypes,
) => {
  switch (action.type) {
    case SHIPPING_ADDRESS_ADD:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
