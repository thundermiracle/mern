import {
  ProductState,
  ProductActionTypes,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  SingleProductState,
  SingleProductActionTypes,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from "./types";

const initProductState: ProductState = {
  loading: false,
};

export const productListReducer = (state = initProductState, action: ProductActionTypes) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const initSingleProductState: SingleProductState = {
  loading: false,
};

export const singleProductReducer = (
  state = initSingleProductState,
  action: SingleProductActionTypes,
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { loading: true };

    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };

    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
