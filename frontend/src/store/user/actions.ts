import { Action, Dispatch } from "redux";
import userService from "../../services/userService";
import { AppThunk } from "../types";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "./types";

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

export const getUserProfile = (): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const data = await userService.getProfile();

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
  }
};
