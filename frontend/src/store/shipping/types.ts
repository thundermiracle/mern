/***************** State part *****************/
export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface ShippingAddressState {
  shippingAddress?: ShippingAddress;
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const SHIPPING_ADDRESS_ADD = "SHIPPING_ADDRESS_ADD";

interface ShippingAddressAddAction {
  type: typeof SHIPPING_ADDRESS_ADD;
  payload: ShippingAddress;
}
export type ShippingActionTypes = ShippingAddressAddAction;
/***************** end of Action part *****************/
