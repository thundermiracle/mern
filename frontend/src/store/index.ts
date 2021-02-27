import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, singleProductReducer } from "./product/reducers";
import { cartReducer } from "./cart/reducers";
import { userLoginReducer } from "./user/reducers";
import { shippingReducer } from "./shipping/reducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  shipping: shippingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const initialState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  },
};

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

// persist cartItems to localStorage
store.subscribe(() => {
  localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
});

export default store;
