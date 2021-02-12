import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import productService from "../../services/productService";
import { AppThunk } from "../types";
import { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL } from "./types";

export const listProducts = (): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const data = await productService.getAll();

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
