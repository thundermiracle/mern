import { Action, Dispatch } from "redux";
import productService from "../../services/productService";
import { AppThunk } from "../types";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
} from "./types";

export const listProducts = (): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const data = await productService.getAll();

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const singleProduct = (id: string): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });

    const data = await productService.get(id);

    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_FAIL, payload: error.message });
  }
};
