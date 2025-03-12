import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isCartOpen: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setisAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setIsCartOpen } = userSlice.actions;
