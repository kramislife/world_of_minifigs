import { createSlice, createSelector } from "@reduxjs/toolkit";
import { productApi } from "../api/productApi";

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

const updateCartItem = (item, updatedProduct) => ({
  ...item,
  name: updatedProduct.product_name,
  image: updatedProduct.product_images?.[0]?.url || item.image,
  discounted_price: updatedProduct.discounted_price || updatedProduct.price,
  price: updatedProduct.price,
  discount: updatedProduct.discount,
  stock: updatedProduct.stock,
  color: updatedProduct.product_color?.name || null,
  includes: updatedProduct.product_includes || "",
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product === newItem.product
      );

      if (existingItemIndex !== -1) {
        // If item exists, remove it and add updated version to the start
        const updatedItem = {
          ...state.cartItems[existingItemIndex],
          quantity: state.cartItems[existingItemIndex].quantity + 1,
        };
        state.cartItems.splice(existingItemIndex, 1);
        state.cartItems.unshift(updatedItem);
      } else {
        // Add new item to the start of the array
        state.cartItems.unshift({ ...newItem, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product === product
      );

      if (itemIndex !== -1) {
        const updatedItem = { ...state.cartItems[itemIndex], quantity };
        // Remove item from current position and add to start
        state.cartItems.splice(itemIndex, 1);
        state.cartItems.unshift(updatedItem);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
  // Add extraReducers to handle product updates
  extraReducers: (builder) => {
    // Handle product updates
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = payload?.product;
        if (updatedProduct) {
          state.cartItems = state.cartItems.map((item) =>
            item.product === updatedProduct._id
              ? updateCartItem(item, updatedProduct)
              : item
          );
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    );

    // Handle successful product fetch
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        if (payload?.products) {
          const updatedItems = state.cartItems.map((item) => {
            const updatedProduct = payload.products.find(
              (p) => p._id === item.product
            );
            return updatedProduct ? updateCartItem(item, updatedProduct) : item;
          });

          if (
            JSON.stringify(updatedItems) !== JSON.stringify(state.cartItems)
          ) {
            state.cartItems = updatedItems;
            localStorage.setItem("cart", JSON.stringify(state));
          }
        }
      }
    );

    // Handle successful single product fetch
    builder.addMatcher(
      productApi.endpoints.getProductDetails.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = payload?.product;
        if (updatedProduct) {
          state.cartItems = state.cartItems.map((item) =>
            item.product === updatedProduct._id
              ? updateCartItem(item, updatedProduct)
              : item
          );
          localStorage.setItem("cart", JSON.stringify(state));
        }
      }
    );
  },
});

// Selectors
const selectCartItems = (state) => state.cart.cartItems;

// Memoized selector for calculating total
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.discounted_price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }
);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
