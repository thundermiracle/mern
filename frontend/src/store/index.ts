import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./product/reducers";

const rootReducer = combineReducers({
  productList: productListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
