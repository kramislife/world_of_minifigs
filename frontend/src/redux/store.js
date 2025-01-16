import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { checkoutApi } from "./api/checkoutApi";
import { orderApi } from "./api/orderApi";

import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware,
    ]),
});
