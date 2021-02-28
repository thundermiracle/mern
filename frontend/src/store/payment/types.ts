/***************** State part *****************/
export interface PaymentState {
  paymentMethod?: string;
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";

interface SavePaymentMethodAction {
  type: typeof SAVE_PAYMENT_METHOD;
  payload: string;
}
export type PaymentActionTypes = SavePaymentMethodAction;
/***************** end of Action part *****************/
