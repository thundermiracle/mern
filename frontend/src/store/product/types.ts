/***************** State part *****************/
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
export interface ProductState {
  loading?: boolean;
  error?: string;
  products?: Product[];
}
export interface SingleProductState {
  loading?: boolean;
  error?: string;
  product?: Product;
}
/***************** end of State part *****************/

/***************** Action part *****************/
export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
interface ProductListRequestAction {
  type: typeof PRODUCT_LIST_REQUEST;
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

export const SINGLE_PRODUCT_REQUEST = "SINGLE_PRODUCT_REQUEST";
export const SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS";
export const SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL";
interface SingleProductRequestAction {
  type: typeof SINGLE_PRODUCT_REQUEST;
}
interface SingleProductSuccessAction {
  type: typeof SINGLE_PRODUCT_SUCCESS;
  payload: Product;
}
interface SingleProductFailAction {
  type: typeof SINGLE_PRODUCT_FAIL;
  payload: string;
}
export type SingleProductActionTypes =
  | SingleProductRequestAction
  | SingleProductSuccessAction
  | SingleProductFailAction;
/***************** end of Action part *****************/
