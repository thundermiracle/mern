import { Action, Dispatch } from "redux";
import userService from "../../services/userService";
import { AppThunk } from "../types";
import { USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_FAIL } from "./types";

export const userLogin = (email: string, password: string): AppThunk => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const data = await userService.login(email, password);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};
