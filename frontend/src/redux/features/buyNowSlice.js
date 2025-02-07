import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadBuyNowFromStorage = () => {
  try {
    const savedBuyNow = localStorage.getItem("buyNow");
    return savedBuyNow ? JSON.parse(savedBuyNow) : { item: null };
  } catch (error) {
    console.error("Error loading buyNow from localStorage:", error);
    return { item: null };
  }
};

const initialState = loadBuyNowFromStorage();

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNowItem: (state, action) => {
      state.item = action.payload;
      localStorage.setItem("buyNow", JSON.stringify(state));
    },
    updateBuyNowQuantity: (state, action) => {
      if (state.item) {
        state.item.quantity = action.payload;
        localStorage.setItem("buyNow", JSON.stringify(state));
      }
    },
    clearBuyNowItem: (state) => {
      state.item = null;
      localStorage.removeItem("buyNow");
    },
  },
});

export const { setBuyNowItem, updateBuyNowQuantity, clearBuyNowItem } =
  buyNowSlice.actions;
export default buyNowSlice.reducer;
