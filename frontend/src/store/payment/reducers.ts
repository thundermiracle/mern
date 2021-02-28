import { PaymentActionTypes, PaymentState, SAVE_PAYMENT_METHOD } from "./types";

const initState: PaymentState = {};

export const paymentReducer = (state: PaymentState = initState, action: PaymentActionTypes) => {
  switch (action.type) {
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
