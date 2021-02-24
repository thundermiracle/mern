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
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";
export const USER_PROFILE_UPD_REQUEST = "USER_PROFILE_UPD_REQUEST";
export const USER_PROFILE_UPD_SUCCESS = "USER_PROFILE_UPD_SUCCESS";
export const USER_PROFILE_UPD_FAIL = "USER_PROFILE_UPD_FAIL";
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
interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}
interface UserRegisterRequestAction {
  type: typeof USER_REGISTER_REQUEST;
}
interface UserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
  payload: User;
}
interface UserRegisterFailAction {
  type: typeof USER_REGISTER_FAIL;
  payload: string;
}
interface UserProfileUpdRequestAction {
  type: typeof USER_PROFILE_UPD_REQUEST;
}
interface UserProfileUpdSuccessAction {
  type: typeof USER_PROFILE_UPD_SUCCESS;
  payload: User;
}
interface UserProfileUpdFailAction {
  type: typeof USER_PROFILE_UPD_FAIL;
  payload: string;
}
export type UserActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserProfileRequestAction
  | UserProfileSuccessAction
  | UserProfileFailAction
  | UserLogoutAction
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailAction
  | UserProfileUpdRequestAction
  | UserProfileUpdSuccessAction
  | UserProfileUpdFailAction;
/***************** end of Action part *****************/
