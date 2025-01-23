import { createSlice, createSelector } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { cartItems: [] };
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = {
        ...action.payload,
        price:
          Number(action.payload.discounted_price || action.payload.price) || 0,
      };
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.product === item.product
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        state.cartItems[existingItemIndex].quantity += item.quantity;
        // Move the updated item to the top
        const updatedItem = state.cartItems.splice(existingItemIndex, 1)[0];
        state.cartItems.unshift(updatedItem);
      } else {
        // Add new item to the beginning of the array
        state.cartItems.unshift(item);
      }
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((i) => i.product === product);
      if (itemIndex !== -1) {
        // Update quantity
        state.cartItems[itemIndex].quantity = quantity;
        // Move the updated item to the top
        const updatedItem = state.cartItems.splice(itemIndex, 1)[0];
        state.cartItems.unshift(updatedItem);
      }
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      // Clear localStorage
      localStorage.removeItem("cart");
    },
  },
});

// Selectors
const selectCartItems = (state) => state.cart.cartItems;

// Memoized selector for calculating total
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((sum, item) => {
      // Ensure price and quantity are numbers and valid
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }
);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
