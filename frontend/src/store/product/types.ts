/***************** State part *****************/
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countIntStock: number;
  rating: number;
  numReviews: number;
}
export interface ProductState {
  loading?: boolean;
  error?: string;
  products?: Product[];
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
interface ProductListRequestAction {
  type: typeof PRODUCT_LIST_REQUEST;
  payload: [];
}
interface ProductListSuccessAction {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: Product[];
}
interface ProductListFailAction {
  type: typeof PRODUCT_LIST_FAIL;
  payload: string;
}
export type ProductActionTypes =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailAction;
/***************** end of Action part *****************/
