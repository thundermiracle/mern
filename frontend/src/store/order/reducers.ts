import {
  OrderCreateState,
  OrderCreateActionTypes,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "./types";

const initProductState: OrderCreateState = {
  loading: false,
  success: false,
};

export const orderCreateReducer = (state = initProductState, action: OrderCreateActionTypes) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };

    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload, success: true };

    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
