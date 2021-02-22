/***************** State part *****************/
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}
export interface UserState {
  loading?: boolean;
  error?: string;
  user?: User;
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAIL = "USER_PROFILE_FAIL";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_FINISHED = "USER_LOGOUT_FINISHED";
interface UserLoginRequestAction {
  type: typeof USER_LOGIN_REQUEST;
}
interface UserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: User;
}
interface UserLoginFailAction {
  type: typeof USER_LOGIN_FAIL;
  payload: string;
}
interface UserProfileRequestAction {
  type: typeof USER_PROFILE_REQUEST;
}
interface UserProfileSuccessAction {
  type: typeof USER_PROFILE_SUCCESS;
  payload: User;
}
interface UserProfileFailAction {
  type: typeof USER_PROFILE_FAIL;
  payload: string;
}
interface UserLogoutRequestAction {
  type: typeof USER_LOGOUT_REQUEST;
}
interface UserLogoutFinishedAction {
  type: typeof USER_LOGOUT_FINISHED;
  payload: undefined;
}
export type UserActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserProfileRequestAction
  | UserProfileSuccessAction
  | UserProfileFailAction
  | UserLogoutRequestAction
  | UserLogoutFinishedAction;
/***************** end of Action part *****************/
