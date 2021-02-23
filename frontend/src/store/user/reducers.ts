import {
  UserState,
  UserActionTypes,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./types";

const initUserState: UserState = {
  loading: false,
};

export const userLoginReducer = (state = initUserState, action: UserActionTypes) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_PROFILE_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_PROFILE_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_LOGIN_FAIL:
    case USER_PROFILE_FAIL:
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
