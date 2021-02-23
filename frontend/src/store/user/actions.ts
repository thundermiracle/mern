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
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
    // do not pass error message if get profile failed
    dispatch({ type: USER_PROFILE_FAIL });
    // dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
  }
};

export const userLogout = (): AppThunk => async (dispatch: Dispatch<Action>) => {
  try {
    await userService.logout();
  } finally {
    dispatch({ type: USER_LOGOUT });
  }
};

export const userRegister = (name: string, email: string, password: string): AppThunk => async (
  dispatch: Dispatch<Action>,
) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const data = await userService.register(name, email, password);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};
