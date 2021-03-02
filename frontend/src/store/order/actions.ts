import { Action, Dispatch } from "redux";
import orderService from "../../services/orderService";
import { AppThunk } from "../types";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, Order } from "./types";

export const createOrder = (order: Order): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const data = await orderService.create(order);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};
