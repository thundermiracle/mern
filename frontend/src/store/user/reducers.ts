import {
  UserState,
  UserActionTypes,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "./types";

const initUserState: UserState = {
  loading: false,
};

export const userLoginReducer = (state = initUserState, action: UserActionTypes) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
