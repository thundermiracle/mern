import { PaymentActionTypes, SAVE_PAYMENT_METHOD } from "./types";

export const savePaymentMethod = (paymentMethod: string): PaymentActionTypes => {
  return {
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  };
};
