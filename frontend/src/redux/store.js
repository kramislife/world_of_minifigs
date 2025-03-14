import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { checkoutApi } from "./api/checkoutApi";
import { orderApi } from "./api/orderApi";
import { reviewApi } from "./api/reviewApi";
import { dashboardApi } from "./api/dashboardApi";

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
    [reviewApi.reducerPath]: reviewApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware,
      reviewApi.middleware,
      dashboardApi.middleware,
    ]),
});

export default store;
