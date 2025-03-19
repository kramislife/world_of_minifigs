import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { checkoutApi } from "./api/checkoutApi";
import { orderApi } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";
import { reviewApi } from "./api/reviewApi";
import { searchApi } from "./api/searchApi";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import buyNowReducer from "./features/buyNowSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    buyNow: buyNowReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware,
      dashboardApi.middleware,
      reviewApi.middleware,
      searchApi.middleware,
    ]),
});

export default store;
